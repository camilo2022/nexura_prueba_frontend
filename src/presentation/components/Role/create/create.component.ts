import { Component } from '@angular/core';
import { RoleService } from '../../../../data/services/Role.service';
import { Router } from '@angular/router';
import { Role } from '../../../../domain/models/Role.model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, MatInputModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  // inicializo el objeto role para ingresar los datos
  role: Role = new Role();

  // importamos el servico de role y el router para redireccionar
  constructor(private roleService:RoleService, private router:Router) { }

  // registro de role
  store(){
    // utilizacon swal para que el role confirme la accion
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirmar si deseas registrar el role.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, registrar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        // en caso de confirmar se llama al servicio al store y se registrara el role
        this.roleService.store(this.role).subscribe(
          (success: any) => {
            // alerta de respuesta satisfactoria
            this.alertSwal('success', '¡Accion Exitosa!', 'Registro del role exitosa.');
            this.index();
          },
          error => {
            // mensajes de errores
            let mensaje = 'Se encontraron errores:\n';
            if(error.error.errors){
              for (const campo in error.error.errors) {
                if (error.error.errors.hasOwnProperty(campo)) {
                  const mensajes = error.error.errors[campo];
                  for (const mensajeError of mensajes) {
                    mensaje += `${mensajeError}`;
                  }
                }
              }
            }else{
              mensaje += error.error.message;
            }
            // alerta de respuesta fallida
            this.alertSwal('error', '¡Accion Fallida!', mensaje);
          }
        )
      } else {
        // en caso de no confirmar se muestra alerta de accion cancelada
        this.alertSwal('warning', '¡Accion cancelada!', 'Registro del role cancelada.');
      }
    })
  }

  // navegacion a listado de roles
  index(){
    this.router.navigate(['Roles']);
  }

  // funcion para mostrar alertas
  alertSwal(icon:any, title:string, text:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })
  }
}
