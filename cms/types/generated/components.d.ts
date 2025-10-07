import type { Schema, Struct } from '@strapi/strapi';

export interface HomepageAcademicExcellence extends Struct.ComponentSchema {
  collectionName: 'components_homepage_academic_excellences';
  info: {
    displayName: 'AcademicExcellence';
  };
  attributes: {
    excellence: Schema.Attribute.Component<'others.acad-exc-card', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface HomepageExcellenceInNumbers extends Struct.ComponentSchema {
  collectionName: 'components_homepage_excellence_in_numbers';
  info: {
    displayName: 'ExcellenceInNumbers';
  };
  attributes: {
    cards: Schema.Attribute.Component<'others.excel-in-num-card', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface HomepageExtraActivitiesHighlight
  extends Struct.ComponentSchema {
  collectionName: 'components_homepage_extra_activities_highlights';
  info: {
    displayName: 'ExtraActivitiesHighlight';
  };
  attributes: {
    activities: Schema.Attribute.Component<'others.activity-card', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface HomepageFooter extends Struct.ComponentSchema {
  collectionName: 'components_homepage_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    contact: Schema.Attribute.Component<'others.foot-details', false>;
  };
}

export interface HomepageHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_hero_sections';
  info: {
    displayName: 'HeroSection';
  };
  attributes: {
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface HomepageImageSlider extends Struct.ComponentSchema {
  collectionName: 'components_homepage_image_sliders';
  info: {
    displayName: 'ImageSlider';
  };
  attributes: {};
}

export interface HomepageLatestUpdates extends Struct.ComponentSchema {
  collectionName: 'components_homepage_latest_updates';
  info: {
    displayName: 'LatestUpdates';
  };
  attributes: {
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    updates: Schema.Attribute.Component<'others.latest-update-card', true>;
  };
}

export interface HomepageMarquee extends Struct.ComponentSchema {
  collectionName: 'components_homepage_marquees';
  info: {
    displayName: 'Marquee';
  };
  attributes: {
    trending: Schema.Attribute.JSON;
  };
}

export interface HomepageTestimoials extends Struct.ComponentSchema {
  collectionName: 'components_homepage_testimoials';
  info: {
    displayName: 'Testimoials';
  };
  attributes: {
    subtitle: Schema.Attribute.Text;
    testimony: Schema.Attribute.Component<'others.testimony-c-ard', true>;
    title: Schema.Attribute.String;
  };
}

export interface LatestAnnouncementpageAnnounement
  extends Struct.ComponentSchema {
  collectionName: 'components_latest_announcementpage_announements';
  info: {
    displayName: 'announement';
  };
  attributes: {
    date: Schema.Attribute.DateTime;
    details: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      ['Important', 'Events', 'Academic', 'Sports', 'General']
    >;
  };
}

export interface OthersAcadExcCard extends Struct.ComponentSchema {
  collectionName: 'components_others_acad_exc_cards';
  info: {
    displayName: 'AcadExcCard';
  };
  attributes: {
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface OthersActivityCard extends Struct.ComponentSchema {
  collectionName: 'components_others_activity_cards';
  info: {
    displayName: 'ActivityCard';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface OthersExcelInNumCard extends Struct.ComponentSchema {
  collectionName: 'components_others_excel_in_num_cards';
  info: {
    displayName: 'ExcelInNumCard';
  };
  attributes: {
    label: Schema.Attribute.String;
    percentage: Schema.Attribute.String;
  };
}

export interface OthersFootDetails extends Struct.ComponentSchema {
  collectionName: 'components_others_foot_details';
  info: {
    displayName: 'FootDetails';
  };
  attributes: {
    contact: Schema.Attribute.JSON;
    motto: Schema.Attribute.Text;
  };
}

export interface OthersLatestUpdateCard extends Struct.ComponentSchema {
  collectionName: 'components_others_latest_update_cards';
  info: {
    displayName: 'LatestUpdateCard';
  };
  attributes: {
    comments: Schema.Attribute.Integer;
    date: Schema.Attribute.DateTime;
    details: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    imageLabel: Schema.Attribute.String;
    likes: Schema.Attribute.Integer;
  };
}

export interface OthersTestimonyCArd extends Struct.ComponentSchema {
  collectionName: 'components_others_testimony_c_ards';
  info: {
    displayName: 'TestimonyCArd';
  };
  attributes: {
    identity: Schema.Attribute.String;
    name: Schema.Attribute.String;
    photo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    testimony: Schema.Attribute.Text;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'homepage.academic-excellence': HomepageAcademicExcellence;
      'homepage.excellence-in-numbers': HomepageExcellenceInNumbers;
      'homepage.extra-activities-highlight': HomepageExtraActivitiesHighlight;
      'homepage.footer': HomepageFooter;
      'homepage.hero-section': HomepageHeroSection;
      'homepage.image-slider': HomepageImageSlider;
      'homepage.latest-updates': HomepageLatestUpdates;
      'homepage.marquee': HomepageMarquee;
      'homepage.testimoials': HomepageTestimoials;
      'latest-announcementpage.announement': LatestAnnouncementpageAnnounement;
      'others.acad-exc-card': OthersAcadExcCard;
      'others.activity-card': OthersActivityCard;
      'others.excel-in-num-card': OthersExcelInNumCard;
      'others.foot-details': OthersFootDetails;
      'others.latest-update-card': OthersLatestUpdateCard;
      'others.testimony-c-ard': OthersTestimonyCArd;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
