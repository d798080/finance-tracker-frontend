//Importation des outils de test Angular
//ComponentFixture permet de manipuler une instance du composant dans les tests
//TestBed permet de configurer un environnement Angular de test
import { ComponentFixture, TestBed } from '@angular/core/testing';

//Importation du composant à tester
import { AddTransaction } from './add-transaction';

//"describe" définit une suite de tests pour le composant AddTransaction
describe('AddTransaction', () => {
  let component: AddTransaction;
  let fixture: ComponentFixture<AddTransaction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTransaction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTransaction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
