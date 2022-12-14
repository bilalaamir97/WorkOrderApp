import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ServiceItemsComponent } from "./service_items.component";

describe("InventoriesComponent", () => {
  let component: ServiceItemsComponent;
  let fixture: ComponentFixture<ServiceItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceItemsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
