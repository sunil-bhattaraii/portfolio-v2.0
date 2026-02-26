import React from 'react';
import SectionWrapper from '../components/SectionWrapper';
import { Section } from '../types';
import ContactHeader from '../components/contact/ContactHeader';
import ContactInfo from '../components/contact/ContactInfo';
import SocialLinks from '../components/SocialLinks';
import ContactForm from '../components/contact/ContactForm';

const Contact: React.FC = () => {
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
          <ContactInfo />
          <SocialLinks variant="contact" />
        </div>

        <ContactForm />
      </div>
    </SectionWrapper>
  );
};

export default Contact;
