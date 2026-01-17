export interface Department {
  name: string;
  slug: string;
  icon: string;
  shortDescription: string;
  formats: string;
  imageUrl?: string;
  detailsUrl: string;
}

export interface ParticipationPath {
  title: string;
  icon: string;
  description: string;
}

export interface DepartmentFormat {
  title: string;
  description?: string;
}

export interface DepartmentResource {
  label: string;
  url: string;
}

export interface DepartmentDetail {
  title?: string;
  subtitle?: string;
  about?: string[];
  formats?: DepartmentFormat[];
  topics?: string[];
  specialists?: string[];
  materials?: string[];
  resources?: DepartmentResource[];
}

export interface ApplicationFormData {
  name: string;
  contact: string;
  departments: string[];
  message: string;
}
