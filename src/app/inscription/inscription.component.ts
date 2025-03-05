// inscription.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './inscription.component.html',
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
    const fullEmail = `${formData.email}@iut.univ-paris8.fr`;

    const user = {
      lastname: formData.lastname,
      firstname: formData.firstname,
      email: fullEmail,
      username: formData.username,
      password: formData.password
    };

    this.authService.register(user).subscribe({
      next: (res) => {
        // Si l'inscription réussit, on tente la connexion automatique.
        this.authService.login({ username: user.username, password: user.password }).subscribe({
          next: (loginRes: any) => {
            this.authService.saveToken(loginRes.token);
            this.router.navigate(['/etudiant/home']); // par exemple
          },
          error: (loginErr) => {
            console.error('Erreur lors du login auto :', loginErr);
            this.errorMessage = 'Erreur lors de la connexion automatique.';
          }
        });
      },
      error: (err) => {
        console.error('Erreur inscription :', err);
        this.errorMessage = err.error || 'Erreur lors de l’inscription.';
      }
    });
  }
}
