export interface CountryInterface {
  '_id': string;
  'name': string;
  'nameEs': string;
  'symbol'?: string;
  'totalCases': number;
  'totalDeaths': number;
  'seriousCases': number;
  'totalRecovered': number;
  'stats'?: Array<StatisticsInterface>;
  'totalCases24h': number
  'totalDeaths24h': number
  'createdAt': string;
  'updatedAt': string;
  'slug': string;
  'population'?: number
  'region'?: string;
  'subregion'?: string;
  'tested'?: number;
  'cities'?: Array<CityInterface>
  'currentInfected'?: number;
  'growthPercentage'?: string;
}

export interface CityInterface {
  '_id': string;
  'name': string;
  'totalCases': number;
  'totalDeaths': number;
  'totalRecovered': number;
  'slug': string;
  'country': string;
  'isActive': boolean;
  'createdAt': string;
  'updatedAt': string;
  '__v': number
  'totalCases24h': number
  'totalDeaths24h': number
}

export interface StatisticsInterface {
  '_id': string;
  'totalCases': number;
  'totalDeaths': number;
  'country': string;
  'createdAt': string;
  'updatedAt': string;
  '__v': number;
}