import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableLike, catchError, tap, map, of } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'https://restcountries.com/v3.1';

  public cacheStore:CacheStore = {
    byCapital: {term: "", countries: []},
    byCountry: {term: "", countries: []},
    byRegion:{region: "", countries: []}
  }


  sortCountries(countries:Country[]):Country[] {
    countries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    return countries;
  }


  getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(error => of([])) ,// El of se usa para devolver un array vacío.
      )
  }


  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
        tap(countries => {
          this.cacheStore.byCapital = {term, countries}
        })
    )
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => {
        this.cacheStore.byCountry = {term, countries}
      })
  )
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => {
        this.cacheStore.byRegion = {region, countries}
      })
  )
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(error => of(null)) // El of se usa para devolver un array vacío.
      )
  }
}
