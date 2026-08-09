/**
 * Seed script — loads the initial portfolio content into MongoDB.
 *
 * Usage:
 *   node --env-file=.env --import tsx scripts/seed.ts          # skip collections that already have data
 *   node --env-file=.env --import tsx scripts/seed.ts --force  # wipe + re-seed everything
 */
import { dbConnect } from '../src/lib/db';
import { SkillModel } from '../src/models/Skill';
import { ProjectModel } from '../src/models/Project';
import { QualificationModel } from '../src/models/Qualification';
import { ExperienceModel } from '../src/models/Experience';
import { SocialModel } from '../src/models/Social';
import { SiteConfigModel } from '../src/models/SiteConfig';
import { AllowlistModel } from '../src/models/Allowlist';
import {
  SEED_SKILLS,
  SEED_PROJECTS,
  SEED_QUALIFICATIONS,
  SEED_EXPERIENCES,
  SEED_SITE_CONFIG,
  SEED_SOCIALS,
  SEED_ALLOWLIST_EMAILS,
} from '../src/lib/seed-data';

const force = process.argv.includes('--force');

async function main() {
  await dbConnect();
  const results: string[] = [];

  async function seedCollection<T>(name: string, model: { countDocuments(): Promise<number>; deleteMany(filter?: unknown): Promise<unknown>; insertMany(docs: T[]): Promise<unknown>; }, docs: T[]) {
    const count = await model.countDocuments();
    if (count === 0 || force) {
      if (force) await model.deleteMany({});
      if (docs.length > 0) {
        await model.insertMany(docs);
        results.push(`${name}: seeded ${docs.length} item(s)`);
      } else {
        results.push(`${name}: nothing to seed`);
      }
    } else {
      results.push(`${name}: skipped (already has ${count} item(s))`);
    }
  }

  await seedCollection('skills', SkillModel, SEED_SKILLS.map(({ id, ...rest }) => rest));
  await seedCollection('projects', ProjectModel, SEED_PROJECTS.map(({ id, ...rest }) => rest));
  await seedCollection('qualifications', QualificationModel, SEED_QUALIFICATIONS.map(({ id, ...rest }) => rest));
  await seedCollection('experience', ExperienceModel, SEED_EXPERIENCES.map(({ id, ...rest }) => rest));
  await seedCollection('socials', SocialModel, SEED_SOCIALS);

  const existingConfig = await SiteConfigModel.findOne({ key: 'site' });
  if (!existingConfig || force) {
    await SiteConfigModel.findOneAndUpdate(
      { key: 'site' },
      { ...SEED_SITE_CONFIG, key: 'site' },
      { upsert: true, returnDocument: 'after' }
    );
    results.push('site-config: seeded');
  } else {
    results.push('site-config: skipped (already exists)');
  }

  let allowlistAdded = 0;
  for (const email of SEED_ALLOWLIST_EMAILS) {
    const res = await AllowlistModel.updateOne(
      { email },
      { $setOnInsert: { email } },
      { upsert: true }
    );
    if (res.upsertedCount > 0) allowlistAdded += 1;
  }
  results.push(`allowlist: ${allowlistAdded} email(s) added`);

  console.log('\nSeed results:');
  for (const line of results) console.log(`  - ${line}`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
