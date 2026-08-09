import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { Section } from '../types';
import ContactHeader from '../components/contact/ContactHeader';
import ContactInfo from '../components/contact/ContactInfo';
import SocialLinks from '../components/SocialLinks';
import ContactForm from '../components/contact/ContactForm';
import { getSiteConfig, getSocials } from '@/lib/queries';

const Contact: React.FC = async () => {
  const [config, socials] = await Promise.all([getSiteConfig(), getSocials()]);

  const contact = config?.contact ?? { email: '', phone: '', location: '' };
  const contactSocials = (socials ?? []).filter((s) => s.showInContact);

  return (
    <SectionWrapper
      id={Section.Contact}
      className="relative"
      scrollTargetId={Section.Hero}
      scrollDirection="up"
    >
      <div className="grid grow grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center flex-1">
        <div>
          <ContactHeader />
          <ContactInfo contact={contact} />
          <SocialLinks socials={contactSocials} variant="contact" />
        </div>

        <ContactForm />
      </div>
    </SectionWrapper>
  );
};

export default Contact;
