import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ModelMapper } from '../mapping/model.mapper';

import { WidgetService } from './widget.service';

describe('WidgetService', () => {
  let service: WidgetService;
  let dummyWidgetService: jasmine.SpyObj<HttpClient>;
  let dummyMapper: jasmine.SpyObj<ModelMapper>;

  beforeEach(async () => {
    dummyWidgetService = jasmine.createSpyObj('HttpClient', ['post', 'put', 'delete', 'get'])

    await TestBed.configureTestingModule({
      providers: [
        {provide: WidgetService, useValue: dummyWidgetService},
        {provide: ModelMapper, useValue: dummyMapper }
      ]
    });
    service = TestBed.inject(WidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
