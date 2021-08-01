import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {


  constructor(
    private fb: FormBuilder,
    private http: HttpClient
    ){

  }

  id = 0;
  fg: FormGroup = new FormGroup({});

  immos: any[] = [];

  ngOnInit() {
    this.fg = this.fb.group({
      room: [undefined, [Validators.required], []],
      address: [undefined, [Validators.required]]
    });
    this.getImmos();
  }

  save() {
    // console.log(this.fg.value);
    this.http
      .post('url', this.fg.value)
      .subscribe((res) => console.log(res), console.error);
  }

  getImmos() {
    this.http
    .get('/immos')
    .subscribe({
      next: (res: any) => this.immos = res
    });
  }

  getById(id: string) {
    this.http
    .get(`/immos/${id}`)
    .subscribe({
      next: (res: any) => this.immos = [res]
    });
  }

  ngOnDestroy() {
    console.log('exit');
  }

}
