import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../../services/beans';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {RmNgIssueComponent} from "../issue.component";
import {RmNgIssueModalComponent} from "../issue-modal/issue-modal.component";

@Component({
    selector: 'rm-ng-issue-id',
    templateUrl: './issue-id.component.html',
    styleUrls: ['./issue-id.component.css']
})
export class RmNgIssueIdComponent implements OnInit {

    private bsModalRef: BsModalRef;

    @Input()
    public issue: Issue;

    constructor(private modalService: BsModalService) {
    }

    ngOnInit() {
    }

    openIssue() {
        const initialState = {
            issue: this.issue
        };
        this.bsModalRef = this.modalService.show(RmNgIssueModalComponent, {initialState} );
    }

}
