// Authentication plans data for signup flow
export const authPlans = [
  {
    id: 1,
    name: 'Basic Package',
    price: '$75',
    duration: '1 Month',
    features: ['5 Exams', 'Basic Analytics', 'Email Support'],
    popular: false
  },
  {
    id: 2,
    name: 'Standard Package',
    price: '$150',
    duration: '3 Months',
    features: ['15 Exams', 'Advanced Analytics', 'Priority Support', 'Certificate Generation'],
    popular: true
  },
  {
    id: 3,
    name: 'Premium Package',
    price: '$300',
    duration: '6 Months',
    features: ['Unlimited Exams', 'Full Analytics Suite', '24/7 Support', 'Custom Branding', 'API Access'],
    popular: false
  },
  {
    id: 4,
    name: 'Enterprise License',
    price: '$500',
    duration: '1 Year',
    features: ['Everything in Premium', 'Multi-user Accounts', 'Dedicated Manager', 'Custom Integrations'],
    popular: false
  }
];

export const howDidYouFindOptions = [
  'Search Engine (Google, Bing, etc.)',
  'Social Media',
  'Referral from Friend/Colleague',
  'Advertisement',
  'Conference/Event',
  'Other'
];

export const timeZones = [
  'UTC-12:00 International Date Line West',
  'UTC-11:00 Midway Island, Samoa',
  'UTC-10:00 Hawaii',
  'UTC-09:00 Alaska',
  'UTC-08:00 Pacific Time (US & Canada)',
  'UTC-07:00 Mountain Time (US & Canada)',
  'UTC-06:00 Central Time (US & Canada)',
  'UTC-05:00 Eastern Time (US & Canada)',
  'UTC-04:00 Atlantic Time (Canada)',
  'UTC-03:30 Newfoundland',
  'UTC-03:00 Brasilia',
  'UTC-02:00 Mid-Atlantic',
  'UTC-01:00 Azores',
  'UTC+00:00 London, Dublin, Lisbon',
  'UTC+01:00 Paris, Berlin, Rome',
  'UTC+02:00 Cairo, Athens, Istanbul',
  'UTC+03:00 Moscow, Baghdad',
  'UTC+03:30 Tehran',
  'UTC+04:00 Abu Dhabi, Muscat',
  'UTC+04:30 Kabul',
  'UTC+05:00 Islamabad, Karachi',
  'UTC+05:30 Chennai, Kolkata, Mumbai, New Delhi',
  'UTC+05:45 Kathmandu',
  'UTC+06:00 Astana, Dhaka',
  'UTC+06:30 Yangon (Rangoon)',
  'UTC+07:00 Bangkok, Hanoi, Jakarta',
  'UTC+08:00 Beijing, Perth, Singapore',
  'UTC+09:00 Tokyo, Seoul, Osaka',
  'UTC+09:30 Adelaide, Darwin',
  'UTC+10:00 Brisbane, Guam, Sydney',
  'UTC+11:00 Magadan, Solomon Islands',
  'UTC+12:00 Auckland, Wellington, Fiji'
];