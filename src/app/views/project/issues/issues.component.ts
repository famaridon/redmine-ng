import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RedmineService} from '../../../services/redmine.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class ProjectQueryIssuesComponent implements OnInit {

  public issues = [];

  constructor(private route: ActivatedRoute, private redmine: RedmineService) {
  }

  ngOnInit() {
    this.route.parent.params.subscribe( (parentParam) => {
      const project = parentParam['project'];
      this.route.params.subscribe((params) => {
        const query = params['query'];
        this.redmine.issues.findByQuery(project, query, 0, 50).subscribe((paginable) => {
          this.issues = paginable.elements;
        });
      });
    });
  }

}
