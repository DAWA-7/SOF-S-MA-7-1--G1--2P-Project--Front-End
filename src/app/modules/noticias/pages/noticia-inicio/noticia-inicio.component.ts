import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import newsData from '../../assets/json/News_MOCK_DATA.json'; // inside module
import newsData from '../../../../../assets/json/News_MOCK_DATA.json'; //inside shared assets
import { mockDataNews } from 'src/assets/ts/MOCK_DATA_News';
import { News } from '../../interfaces/news';

@Component({
  selector: 'app-noticia-inicio',
  templateUrl: './noticia-inicio.component.html',
  styleUrls: ['./noticia-inicio.component.css'],
})
export class NoticiaInicioComponent implements OnInit {
  // #region Variable Declaration
  listNews: News[] = mockDataNews;
  years = '';
  listYears: String[] = ['2022', '2021'];
  // #endregion

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // #region Functions
  filterNewsByYear(listNews: News[], listYears: string[]) {}
  // #endregion
}
