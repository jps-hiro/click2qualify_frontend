import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { USER_ROLE } from 'src/app/consts/consts';
import { QuestionsService } from 'src/app/services/questions.service';
import { GridOptions } from 'ag-grid-community';
import { Page } from 'src/app/shared/table/page.model';
import { Router } from '@angular/router';

@Component({
  selector: 'smart-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  tableList;
  
  columns = [
    {name: 'title', title: 'Title'},
    {name: 'step', title: 'Question/Answer Step'},
    {name: 'id', title: 'Step Number'},
  ];
  
  dropDownMenu = [
    {
      name: 'edit',
      label: 'Edit'
    },
  ];

  
  constructor(
    private questionService: QuestionsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { 
    this.tableList = [];
  }

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    this.questionService.getAllQuestions().subscribe(data => {
      this.tableList = data.data.questions;
      setTimeout(()=>{
        this.cdr.detectChanges();
      }, 100)
    })
  }
  
  buttonClicked($event) {
    this.router.navigate([`/admin/questions/edit/${$event.data._id}`]);
  }
}