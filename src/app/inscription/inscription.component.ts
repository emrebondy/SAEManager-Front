import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  accountCreationForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Supprimer le token existant si présent (ou vérifier s'il est expiré)
    if (this.authService.getToken()) {
      this.authService.logout();
    }

    this.accountCreationForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  handleSubmit(): void {
    if (this.accountCreationForm.invalid) {
      return;
    }

    const formData = this.accountCreationForm.value;
    // Concaténer le domaine fixe à la partie email saisie
    const fullEmail = formData.email + "@iut.univ-paris8.fr";

    // Construire l'objet d'inscription attendu par le back-end
    const registrationData = {
      nom: formData.lastname,
      prenom: formData.firstname,
      email: fullEmail,
      login: formData.username, // L'utilisateur choisit son identifiant
      password: formData.password
      // On ne transmet pas estAdmin/estProf, la logique côté back fixera ces valeurs (étudiant par défaut)
    };

    // Appel à l'endpoint d'inscription
    this.authService.inscrirePersonne(registrationData).subscribe({
      next: (response: any) => {
        // La réponse devrait contenir la personne inscrite et un token JWT
        // Par exemple : { personne: { ... }, token: "eyJhbGciOi...", type: "Bearer" }
        this.authService.saveToken(response.token);
        // Rediriger vers la page d'accueil (par exemple '/Accueil')
        this.router.navigate(['/Accueil']);
      },
      error: (error: any) => {
        console.error("Erreur lors de l'inscription", error);
        this.errorMessage = error.error || "Erreur lors de l'inscription.";
      }
    });
  }
}
