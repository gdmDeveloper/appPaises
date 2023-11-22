
import { Country } from "./country";
import { Region } from "./region.type";


export interface CacheStore {
  byCapital: TermsCountry;
  byCountry: TermsCountry;
  byRegion:  TermsRegion;
}

export interface TermsCountry {
  term: string;
  countries: Country[];
}

export interface TermsRegion {
  region?: Region;
  countries: Country[];
}
