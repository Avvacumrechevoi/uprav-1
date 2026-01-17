export interface Department {
  name: string;
  icon: string;
  shortDescription: string;
  formats: string;
  imageUrl?: string;
  detailsUrl?: string;
}

export interface ParticipationPath {
  title: string;
  icon: string;
  description: string;
}

export interface ApplicationFormData {
  name: string;
  contact: string;
  departments: string[];
  message: string;
}
