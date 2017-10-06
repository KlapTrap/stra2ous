import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { registeredCnsisEntitySelector } from '../../../../store/actions/cnsis.actions';
import { SetCFDetails } from '../../../../store/actions/create-applications-page.actions';
import { GetAllOrganizations, OrganizationSchema } from '../../../../store/actions/organization.actions';
import { AppState } from '../../../../store/app-state';
import { getCurrentPage } from '../../../../store/reducers/pagination.reducer';

@Component({
  selector: 'app-create-application-step1',
  templateUrl: './create-application-step1.component.html',
  styleUrls: ['./create-application-step1.component.scss'],
})
export class CreateApplicationStep1Component implements OnInit, AfterContentInit {

  constructor(private store: Store<AppState>) {
  }

  paginationKey = 'createApplication';

  data$: Observable<any>;
  cfValid$: Observable<boolean>;

  @ViewChild('orgSelect')
  orgSelect: NgModel;

  @ViewChild('cfSelect')
  cfSelect: NgModel;

  @ViewChild('spaceSelect')
  spaceSelect: NgModel;

  @ViewChild('cfForm')
  cfForm: NgForm;

  validate: Observable<boolean>;

  currentOrg: any;

  cfList$ = this.store.select(registeredCnsisEntitySelector).first();

  private getData$ = Observable.combineLatest(
    getCurrentPage({
      entityType: OrganizationSchema.key,
      paginationKey: this.paginationKey,
      store: this.store,
      action: new GetAllOrganizations(this.paginationKey),
      schema: [OrganizationSchema]
    }).filter(orgList => {
      return !orgList.paginationEntity.fetching;
    }).first(),
    this.cfList$
  );

  orgList$: Observable<any>;

  spaceList$: Observable<any>;

  selectedCF: any;

  selectedOrg: any;

  selectedSpace: any;

  onNext = () => {
    this.store.dispatch(new SetCFDetails({
      cloudFoundry: this.cfSelect.value,
      org: this.orgSelect.value,
      space: this.spaceSelect.value
    }));
    return Observable.of({ success: true });
  }

  ngOnInit() {
    this.orgList$ = Observable.combineLatest(
      this.cfSelect.valueChanges.startWith(''),
      this.getData$
    )
      .do(() => this.selectedOrg = null)
      .map(([selectedCF, data]) => {
        this.orgSelect.viewModel = '';
        const [orgList, cfList] = data;
        if (selectedCF) {
          if (orgList.data) {
            return orgList.data
              .map(org => org.entity)
              .filter(org => org.cfGuid === selectedCF.guid);
          }
        }
        return [];
      });

    this.spaceList$ = Observable.combineLatest(
      this.orgSelect.valueChanges.startWith(''),
      this.getData$
    )
      .do(() => this.selectedSpace = null)
      .map(([selectedOrg, data]) => {
        const [orgList, cfList] = data;
        if (selectedOrg) {
          return selectedOrg.spaces.map(space => {
            space.entity.guid = space.metadata.guid;
            return space.entity;
          });
        }
        return [];
      });
  }

  ngAfterContentInit() {

    this.validate = this.cfForm.statusChanges
      .map(() => {
        return this.cfForm.valid;
      });

  }
}
