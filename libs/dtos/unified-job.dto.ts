export interface UnifiedJobDto {
  id: string;
  title: string;
  company: {
    name: string;
    industry?: string;
    website?: string;
  };
  location: {
    city: string;
    state: string;
    remote: boolean;
  };
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  experience?: number;
  skills: string[];
  type?: string;
  postedDate: Date;
}
