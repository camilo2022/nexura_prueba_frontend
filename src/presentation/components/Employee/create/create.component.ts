import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../data/services/Employee.service';
import { Router } from '@angular/router';
import { Employee } from '../../../../domain/models/Employee.model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Area } from '../../../../domain/models/Area.model';
import { Role } from '../../../../domain/models/Role.model';
import { AreaService } from '../../../../data/services/Area.service';
import { RoleService } from '../../../../data/services/Role.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, MatInputModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
  // inicializo el objeto employee para ingresar los datos
  employee: Employee = new Employee();
  areas: Area[] = [];
  roles: Role[] = [];

  // importamos el servico de employee y el router para redireccionar
  constructor(
    private employeeService:EmployeeService,
    private areaService:AreaService,
    private roleService:RoleService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getAreas();
    this.getRoles();
  }

  getAreas(){
    this.areaService.all().subscribe(
      (success: any) => {
        this.areas = success.data;
      },
      error => {
        console.error('ERROR A TRAER LAS AREAS')
      }
    )
  }

  getRoles(){
    this.roleService.all().subscribe(
      (success: any) => {
        this.roles = success.data;
      },
      error => {
        console.error('ERROR A TRAER LOS ROLES')
      }
    )
  }

  // registro de employee
  store(){
    this.employee.bulletin = this.employee.bulletin ? 1 : 0
    // utilizacon swal para que el employee confirme la accion
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirmar si deseas registrar el employee.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, registrar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        // en caso de confirmar se llama al servicio al store y se registrara el employee
        this.employeeService.store(this.employee).subscribe(
          (success: any) => {
            // alerta de respuesta satisfactoria
            this.alertSwal('success', '¡Accion Exitosa!', 'Registro del employee exitosa.');
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
        this.alertSwal('warning', '¡Accion cancelada!', 'Registro del employee cancelada.');
      }
    })
  }

  // navegacion a listado de employees
  index(){
    this.router.navigate(['Employees']);
  }

  // funcion para mostrar alertas
  alertSwal(icon:any, title:string, text:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })
  }
  onRoleChange(event: any, roleId: number) {
    if (event.target.checked) {
      this.addRole(roleId);  // Llama a la función para añadir el role_id
    } else {
      this.removeRole(roleId);  // Llama a la función para eliminar el role_id
    }
  }

  // Función para agregar role_id al array
  addRole(roleId: number) {
    this.employee.role_ids.push(roleId);
    console.log('Rol añadido:', roleId);
  }

  // Función para eliminar role_id del array
  removeRole(roleId: number) {
    const index = this.employee.role_ids.indexOf(roleId);
    if (index > -1) {
      this.employee.role_ids.splice(index, 1);  // Elimina el role_id del array
      console.log('Rol eliminado:', roleId);
    }
  }
}
