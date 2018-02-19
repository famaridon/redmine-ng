import { Component, OnInit } from '@angular/core';
import {RmNgIssueComponent} from '../issue.component';
import {BsModalRef} from "ngx-bootstrap";

@Component({
  selector: 'app-issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.css']
})
export class RmNgIssueModalComponent extends RmNgIssueComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) {
      super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
