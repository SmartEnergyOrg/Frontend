import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ModelMapper } from 'src/app/shared/mapping/model.mapper';

import { DeleteFormComponent } from './delete-form.component';

describe('DeleteFormComponent', () => {
  let component: DeleteFormComponent;
  let fixture: ComponentFixture<DeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteFormComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ModelMapper],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
