import type { Schema, Struct } from '@strapi/strapi';

export interface AchievementsBody extends Struct.ComponentSchema {
  collectionName: 'components_achievements_bodies';
  info: {
    displayName: 'Body';
  };
  attributes: {
    lists: Schema.Attribute.Component<'others.achievement-card', true>;
  };
}

export interface AchievementsFooter extends Struct.ComponentSchema {
  collectionName: 'components_achievements_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    stats: Schema.Attribute.JSON;
  };
}

export interface AchievementsHeader extends Struct.ComponentSchema {
  collectionName: 'components_achievements_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    details: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface AlumniAchievements extends Struct.ComponentSchema {
  collectionName: 'components_alumni_achievements';
  info: {
    displayName: 'Achievements';
  };
  attributes: {
    achievements: Schema.Attribute.Component<
      'others.alumni-achievement-card1',
      true
    >;
    achievements2: Schema.Attribute.Component<
      'others.alumni-achievement-card2',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface AlumniDirectory extends Struct.ComponentSchema {
  collectionName: 'components_alumni_directories';
  info: {
    displayName: 'Directory';
  };
  attributes: {
    directories: Schema.Attribute.Component<'others.alumni-dir-card', true>;
    title: Schema.Attribute.String;
  };
}

export interface AlumniEvents extends Struct.ComponentSchema {
  collectionName: 'components_alumni_events';
  info: {
    displayName: 'Events';
  };
  attributes: {
    Events: Schema.Attribute.Component<'others.alumni-event-card', true>;
    title: Schema.Attribute.String;
  };
}

export interface AlumniOverview extends Struct.ComponentSchema {
  collectionName: 'components_alumni_overviews';
  info: {
    displayName: 'Overview';
  };
  attributes: {
    greetings: Schema.Attribute.JSON;
    Persons: Schema.Attribute.Component<'others.alumni-card', true>;
    stats: Schema.Attribute.JSON;
  };
}

export interface ContactUsCampusGallery extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_campus_galleries';
  info: {
    displayName: 'CampusGallery';
  };
  attributes: {
    galleries: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface ContactUsContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_contact_infos';
  info: {
    displayName: 'ContactInfo';
  };
  attributes: {
    email: Schema.Attribute.Email;
    schoolAddress: Schema.Attribute.Blocks;
    schoolHours: Schema.Attribute.Blocks;
    telephone: Schema.Attribute.String;
  };
}

export interface ContactUsFaqs extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_faqs';
  info: {
    displayName: 'Faqs';
  };
  attributes: {
    faq: Schema.Attribute.Component<'others.faq', true>;
  };
}

export interface ContactUsHowToReachUs extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_how_to_reachuses';
  info: {
    displayName: 'HowToReachUs';
  };
  attributes: {
    byCar: Schema.Attribute.Text;
    publicTransport: Schema.Attribute.Text;
  };
}

export interface CurriculumManagementCurriculum extends Struct.ComponentSchema {
  collectionName: 'components_curriculum_management_curricula';
  info: {
    displayName: 'Curriculum';
  };
  attributes: {
    lists: Schema.Attribute.JSON;
  };
}

export interface CurriculumManagementFooter extends Struct.ComponentSchema {
  collectionName: 'components_curriculum_management_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    details: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface CurriculumManagementHero extends Struct.ComponentSchema {
  collectionName: 'components_curriculum_management_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface GalleriMomentMoment extends Struct.ComponentSchema {
  collectionName: 'components_galleri_moment_moments';
  info: {
    displayName: 'Moment';
  };
  attributes: {
    MomentCards: Schema.Attribute.Component<'others.moment-card', true>;
  };
}

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
  attributes: {
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
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

export interface NationalEduPhilCoreOfPublicService
  extends Struct.ComponentSchema {
  collectionName: 'components_national_edu_phil_core_of_public_services';
  info: {
    displayName: 'CoreOfPublicService';
  };
  attributes: {
    services: Schema.Attribute.JSON;
  };
}

export interface NationalEduPhilGoals extends Struct.ComponentSchema {
  collectionName: 'components_national_edu_phil_goals';
  info: {
    displayName: 'Goals';
  };
  attributes: {
    goals: Schema.Attribute.JSON;
  };
}

export interface NationalEduPhilNationalEduPhilosophy
  extends Struct.ComponentSchema {
  collectionName: 'components_national_edu_phil_national_edu_philosophies';
  info: {
    displayName: 'NationalEduPhilosophy';
  };
  attributes: {
    Card: Schema.Attribute.Component<'others.card', true>;
    details: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface OrgChartChart extends Struct.ComponentSchema {
  collectionName: 'components_org_chart_charts';
  info: {
    displayName: 'Chart';
  };
  attributes: {
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface OrgChartStats extends Struct.ComponentSchema {
  collectionName: 'components_org_chart_stats';
  info: {
    displayName: 'Stats';
  };
  attributes: {
    advancedDegrees: Schema.Attribute.String;
    avgYears: Schema.Attribute.String;
    departments: Schema.Attribute.String;
    totalStaffs: Schema.Attribute.String;
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

export interface OthersAchievementCard extends Struct.ComponentSchema {
  collectionName: 'components_others_achievement_cards';
  info: {
    displayName: 'AchievementCard';
  };
  attributes: {
    details: Schema.Attribute.JSON;
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    reach: Schema.Attribute.Enumeration<
      ['National', 'Regional', 'District', 'State']
    >;
    type: Schema.Attribute.Enumeration<
      ['Academic', 'Sports', 'Science', 'Community']
    >;
    year: Schema.Attribute.Integer;
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

export interface OthersAlumniAchievementCard1 extends Struct.ComponentSchema {
  collectionName: 'components_others_alumni_achievement_card1s';
  info: {
    displayName: 'AlumniAchievementCard1';
  };
  attributes: {
    award: Schema.Attribute.Text;
    name: Schema.Attribute.String;
  };
}

export interface OthersAlumniAchievementCard2 extends Struct.ComponentSchema {
  collectionName: 'components_others_alumni_achievement_card2s';
  info: {
    displayName: 'AlumniAchievementCard2';
  };
  attributes: {
    percentage: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface OthersAlumniCard extends Struct.ComponentSchema {
  collectionName: 'components_others_alumni_cards';
  info: {
    displayName: 'AlumniCard';
  };
  attributes: {
    batch: Schema.Attribute.Date;
    credit: Schema.Attribute.String;
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    organization: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface OthersAlumniDirCard extends Struct.ComponentSchema {
  collectionName: 'components_others_alumni_dir_cards';
  info: {
    displayName: 'AlumniDirCard';
  };
  attributes: {
    batch: Schema.Attribute.Date;
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
  };
}

export interface OthersAlumniEventCard extends Struct.ComponentSchema {
  collectionName: 'components_others_alumni_event_cards';
  info: {
    displayName: 'AlumniEventCard';
  };
  attributes: {
    date: Schema.Attribute.Date;
    location: Schema.Attribute.String;
    time: Schema.Attribute.Time;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      ['Reunion', 'Workshop', 'Networking', 'Others']
    >;
  };
}

export interface OthersCard extends Struct.ComponentSchema {
  collectionName: 'components_others_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    details: Schema.Attribute.Text;
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

export interface OthersFaq extends Struct.ComponentSchema {
  collectionName: 'components_others_faqs';
  info: {
    displayName: 'faq';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.Text;
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

export interface OthersGarisMasaSejarahCard extends Struct.ComponentSchema {
  collectionName: 'components_others_garis_masa_sejarah_cards';
  info: {
    displayName: 'GarisMasaSejarahCard';
  };
  attributes: {
    date: Schema.Attribute.Date;
    details: Schema.Attribute.Text;
    title: Schema.Attribute.String;
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

export interface OthersMissionCard extends Struct.ComponentSchema {
  collectionName: 'components_others_mission_cards';
  info: {
    displayName: 'MissionCard';
  };
  attributes: {
    details: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface OthersMomentCard extends Struct.ComponentSchema {
  collectionName: 'components_others_moment_cards';
  info: {
    displayName: 'MomentCard';
  };
  attributes: {
    date: Schema.Attribute.Date;
    details: Schema.Attribute.Text;
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    location: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface OthersPrincipalCard extends Struct.ComponentSchema {
  collectionName: 'components_others_principal_cards';
  info: {
    displayName: 'PrincipalCard';
  };
  attributes: {
    motto: Schema.Attribute.String;
    name: Schema.Attribute.String;
    title: Schema.Attribute.String;
    vmv: Schema.Attribute.JSON;
  };
}

export interface OthersPtaActionCard extends Struct.ComponentSchema {
  collectionName: 'components_others_pta_action_cards';
  info: {
    displayName: 'PtaActionCard';
  };
  attributes: {
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      [
        'Meetings',
        'Events',
        'Conferences',
        'Workshops',
        'Volunteering',
        'Others',
      ]
    >;
  };
}

export interface OthersPtaCommitteeCard extends Struct.ComponentSchema {
  collectionName: 'components_others_pta_committee_cards';
  info: {
    displayName: 'PtaCommitteeCard';
  };
  attributes: {
    email: Schema.Attribute.Email;
    name: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface OthersPtaContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_others_pta_contact_infos';
  info: {
    displayName: 'PtaContactInfo';
  };
  attributes: {
    text: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface OthersSchoolIdentityVisionCard extends Struct.ComponentSchema {
  collectionName: 'components_others_school_identity_vision_cards';
  info: {
    displayName: 'SchoolIdentityVisionCard';
  };
  attributes: {
    details: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    translation: Schema.Attribute.Text;
  };
}

export interface OthersStudentIdentityCoreValuesCard
  extends Struct.ComponentSchema {
  collectionName: 'components_others_student_identity_core_values_cards';
  info: {
    displayName: 'StudentIdentityCoreValuesCard';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface OthersStudentIdentityObjectiveCard
  extends Struct.ComponentSchema {
  collectionName: 'components_others_student_identity_objective_cards';
  info: {
    displayName: 'StudentIdentityObjectiveCard';
  };
  attributes: {
    details: Schema.Attribute.Text;
    translation: Schema.Attribute.Text;
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

export interface OthersVisionCard extends Struct.ComponentSchema {
  collectionName: 'components_others_vision_cards';
  info: {
    displayName: 'VisionCard';
  };
  attributes: {
    details: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface PrincipalHero extends Struct.ComponentSchema {
  collectionName: 'components_principal_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    details: Schema.Attribute.Component<'others.principal-card', false>;
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface PrincipalSpeech extends Struct.ComponentSchema {
  collectionName: 'components_principal_speeches';
  info: {
    displayName: 'Speech';
  };
  attributes: {
    details: Schema.Attribute.Blocks;
  };
}

export interface PtaAbout extends Struct.ComponentSchema {
  collectionName: 'components_pta_abouts';
  info: {
    displayName: 'About';
  };
  attributes: {
    cards: Schema.Attribute.Component<'others.card', true>;
    details: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface PtaAction extends Struct.ComponentSchema {
  collectionName: 'components_pta_actions';
  info: {
    displayName: 'Action';
  };
  attributes: {
    Cards: Schema.Attribute.Component<'others.pta-action-card', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface PtaActivities extends Struct.ComponentSchema {
  collectionName: 'components_pta_activities';
  info: {
    displayName: 'Activities';
  };
  attributes: {
    activities: Schema.Attribute.Component<'others.card', true>;
    aEvents: Schema.Attribute.Component<'others.card', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface PtaContact extends Struct.ComponentSchema {
  collectionName: 'components_pta_contacts';
  info: {
    displayName: 'Contact';
  };
  attributes: {
    committeeCards: Schema.Attribute.Component<
      'others.pta-committee-card',
      true
    >;
    contactInfos: Schema.Attribute.Component<'others.pta-contact-info', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface PtaMembership extends Struct.ComponentSchema {
  collectionName: 'components_pta_memberships';
  info: {
    displayName: 'Membership';
  };
  attributes: {
    becomeAMember: Schema.Attribute.JSON;
    schedule: Schema.Attribute.JSON;
  };
}

export interface SchoolHistoryGarisMasaSejarah extends Struct.ComponentSchema {
  collectionName: 'components_school_history_garis_masa_sejarahs';
  info: {
    displayName: 'GarisMasaSejarah';
  };
  attributes: {
    GarisMasaSejarahCards: Schema.Attribute.Component<
      'others.garis-masa-sejarah-card',
      true
    >;
  };
}

export interface SchoolHistoryKemudahanDanPembinaan
  extends Struct.ComponentSchema {
  collectionName: 'components_school_history_kemudahan_dan_pembinaans';
  info: {
    displayName: 'KemudahanDanPembinaan';
  };
  attributes: {
    details: Schema.Attribute.Text;
    imgs: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface SchoolHistoryKepimpinanSekolah extends Struct.ComponentSchema {
  collectionName: 'components_school_history_kepimpinan_sekolahs';
  info: {
    displayName: 'KepimpinanSekolah';
  };
  attributes: {
    label: Schema.Attribute.Text;
    list: Schema.Attribute.JSON;
  };
}

export interface SchoolHistoryMisiDanMatlamat extends Struct.ComponentSchema {
  collectionName: 'components_school_history_misi_dan_matlamats';
  info: {
    displayName: 'MisiDanMatlamat';
  };
  attributes: {
    details: Schema.Attribute.Text;
    quote: Schema.Attribute.Text;
  };
}

export interface SchoolHistoryPencapaian extends Struct.ComponentSchema {
  collectionName: 'components_school_history_pencapaians';
  info: {
    displayName: 'Pencapaian';
  };
  attributes: {
    list: Schema.Attribute.JSON;
  };
}

export interface SchoolHistoryPengenalan extends Struct.ComponentSchema {
  collectionName: 'components_school_history_pengenalans';
  info: {
    displayName: 'Pengenalan';
  };
  attributes: {
    details: Schema.Attribute.Text;
    theNumbers: Schema.Attribute.JSON;
  };
}

export interface SchoolIdentityCoreValues extends Struct.ComponentSchema {
  collectionName: 'components_school_identity_core_values';
  info: {
    displayName: 'CoreValues';
  };
  attributes: {
    Cards: Schema.Attribute.Component<
      'others.student-identity-core-values-card',
      true
    >;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SchoolIdentityObjectives extends Struct.ComponentSchema {
  collectionName: 'components_school_identity_objectives';
  info: {
    displayName: 'Objectives';
  };
  attributes: {
    Cards: Schema.Attribute.Component<
      'others.student-identity-objective-card',
      true
    >;
  };
}

export interface SchoolIdentityPhilosophy extends Struct.ComponentSchema {
  collectionName: 'components_school_identity_philosophies';
  info: {
    displayName: 'Philosophy';
  };
  attributes: {
    philosophy: Schema.Attribute.Blocks;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SchoolIdentityVisionAndMission extends Struct.ComponentSchema {
  collectionName: 'components_school_identity_vision_and_missions';
  info: {
    displayName: 'VisionAndMission';
  };
  attributes: {
    Cards: Schema.Attribute.Component<
      'others.school-identity-vision-card',
      true
    >;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {};
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

export interface TeachersAndStaffsCoverImg extends Struct.ComponentSchema {
  collectionName: 'components_teachers_and_staffs_cover_imgs';
  info: {
    displayName: 'CoverImg';
  };
  attributes: {
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    properties: Schema.Attribute.JSON;
  };
}

export interface TeachersAndStaffsDedicatedTeam extends Struct.ComponentSchema {
  collectionName: 'components_teachers_and_staffs_dedicated_teams';
  info: {
    displayName: 'DedicatedTeam';
  };
  attributes: {
    details: Schema.Attribute.Text;
    motto: Schema.Attribute.JSON;
  };
}

export interface TeachersAndStaffsMissionsAndValues
  extends Struct.ComponentSchema {
  collectionName: 'components_teachers_and_staffs_missions_and_values';
  info: {
    displayName: 'MissionsAndValues';
  };
  attributes: {
    Cards: Schema.Attribute.Component<'others.card', true>;
  };
}

export interface VisionAndMissionCommitment extends Struct.ComponentSchema {
  collectionName: 'components_vision_and_mission_commitments';
  info: {
    displayName: 'Commitment';
  };
  attributes: {
    imgs: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface VisionAndMissionMission extends Struct.ComponentSchema {
  collectionName: 'components_vision_and_mission_missions';
  info: {
    displayName: 'Mission';
  };
  attributes: {
    Cards: Schema.Attribute.Component<'others.mission-card', true>;
    hd1: Schema.Attribute.Text;
    hd2: Schema.Attribute.Text;
  };
}

export interface VisionAndMissionVision extends Struct.ComponentSchema {
  collectionName: 'components_vision_and_mission_visions';
  info: {
    displayName: 'Vision';
  };
  attributes: {
    Cards: Schema.Attribute.Component<'others.vision-card', true>;
    hd1: Schema.Attribute.Text;
    hd2: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'achievements.body': AchievementsBody;
      'achievements.footer': AchievementsFooter;
      'achievements.header': AchievementsHeader;
      'alumni.achievements': AlumniAchievements;
      'alumni.directory': AlumniDirectory;
      'alumni.events': AlumniEvents;
      'alumni.overview': AlumniOverview;
      'contact-us.campus-gallery': ContactUsCampusGallery;
      'contact-us.contact-info': ContactUsContactInfo;
      'contact-us.faqs': ContactUsFaqs;
      'contact-us.how-to-reach-us': ContactUsHowToReachUs;
      'curriculum-management.curriculum': CurriculumManagementCurriculum;
      'curriculum-management.footer': CurriculumManagementFooter;
      'curriculum-management.hero': CurriculumManagementHero;
      'galleri-moment.moment': GalleriMomentMoment;
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
      'national-edu-phil.core-of-public-service': NationalEduPhilCoreOfPublicService;
      'national-edu-phil.goals': NationalEduPhilGoals;
      'national-edu-phil.national-edu-philosophy': NationalEduPhilNationalEduPhilosophy;
      'org-chart.chart': OrgChartChart;
      'org-chart.stats': OrgChartStats;
      'others.acad-exc-card': OthersAcadExcCard;
      'others.achievement-card': OthersAchievementCard;
      'others.activity-card': OthersActivityCard;
      'others.alumni-achievement-card1': OthersAlumniAchievementCard1;
      'others.alumni-achievement-card2': OthersAlumniAchievementCard2;
      'others.alumni-card': OthersAlumniCard;
      'others.alumni-dir-card': OthersAlumniDirCard;
      'others.alumni-event-card': OthersAlumniEventCard;
      'others.card': OthersCard;
      'others.excel-in-num-card': OthersExcelInNumCard;
      'others.faq': OthersFaq;
      'others.foot-details': OthersFootDetails;
      'others.garis-masa-sejarah-card': OthersGarisMasaSejarahCard;
      'others.latest-update-card': OthersLatestUpdateCard;
      'others.mission-card': OthersMissionCard;
      'others.moment-card': OthersMomentCard;
      'others.principal-card': OthersPrincipalCard;
      'others.pta-action-card': OthersPtaActionCard;
      'others.pta-committee-card': OthersPtaCommitteeCard;
      'others.pta-contact-info': OthersPtaContactInfo;
      'others.school-identity-vision-card': OthersSchoolIdentityVisionCard;
      'others.student-identity-core-values-card': OthersStudentIdentityCoreValuesCard;
      'others.student-identity-objective-card': OthersStudentIdentityObjectiveCard;
      'others.testimony-c-ard': OthersTestimonyCArd;
      'others.vision-card': OthersVisionCard;
      'principal.hero': PrincipalHero;
      'principal.speech': PrincipalSpeech;
      'pta.about': PtaAbout;
      'pta.action': PtaAction;
      'pta.activities': PtaActivities;
      'pta.contact': PtaContact;
      'pta.membership': PtaMembership;
      'school-history.garis-masa-sejarah': SchoolHistoryGarisMasaSejarah;
      'school-history.kemudahan-dan-pembinaan': SchoolHistoryKemudahanDanPembinaan;
      'school-history.kepimpinan-sekolah': SchoolHistoryKepimpinanSekolah;
      'school-history.misi-dan-matlamat': SchoolHistoryMisiDanMatlamat;
      'school-history.pencapaian': SchoolHistoryPencapaian;
      'school-history.pengenalan': SchoolHistoryPengenalan;
      'school-identity.core-values': SchoolIdentityCoreValues;
      'school-identity.objectives': SchoolIdentityObjectives;
      'school-identity.philosophy': SchoolIdentityPhilosophy;
      'school-identity.vision-and-mission': SchoolIdentityVisionAndMission;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'teachers-and-staffs.cover-img': TeachersAndStaffsCoverImg;
      'teachers-and-staffs.dedicated-team': TeachersAndStaffsDedicatedTeam;
      'teachers-and-staffs.missions-and-values': TeachersAndStaffsMissionsAndValues;
      'vision-and-mission.commitment': VisionAndMissionCommitment;
      'vision-and-mission.mission': VisionAndMissionMission;
      'vision-and-mission.vision': VisionAndMissionVision;
    }
  }
}
