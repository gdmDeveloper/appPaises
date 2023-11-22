import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit{

  constructor(private countriesService: CountriesService) { }


  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.countries = this.countriesService.sortCountries(this.countries);
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = "";

  searchByCapital(term: string): void {
    this.isLoading = true;
    this.countriesService.searchCapital(term).subscribe(countries => {
    this.countries = countries;
    this.countries = this.countriesService.sortCountries(this.countries);
      this.isLoading = false;
      console.log({ countries });

    })
  }

}
