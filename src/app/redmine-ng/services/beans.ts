import {IOption} from '../../states-inputs/states-inputs.module';

export class Paginable<T> {
    public total_count: number;
    public offset: number;
    public limit: number;

    public elements: Array<T> = [];

    constructor(json: any, caster: (element) => T) {
        this.total_count = json.total_count;
        this.offset = json.offset;
        this.limit = json.limit;
        if (json.elements) {
            json.elements.forEach((element) => {
                this.elements.push(caster(element));
            });
        }
    }
}

export abstract class AbstractRedmineBean implements IOption {

    public id: number;
    public name: string;

    constructor(json?: any) {
        if (json) {
            this.id = json.id;
            this.name = json.name;
        }
    }

    getDisplayLabel(): string {
        return this.name;
    }

    getComparableValue() {
        return this.id;
    }

    protected parseDate(sDate: string | undefined): Date {
        if (sDate) {
            return new Date(sDate);
        }
        return null;
    }

    public stringify(): string {
        return JSON.stringify(this);
    }
}

export class Project extends AbstractRedmineBean {
    public identifier: string;
    public description: string;
    public status: number;
    public is_public: boolean;
    public created_on: Date;
    public updated_on: Date;
    public parent: Project;
    public trackers: Tracker[] = [];
    public issue_categories: Category[] = [];

    constructor(json?: any) {
        super(json);
        if (json) {
            this.identifier = json.identifier;
            this.description = json.description;
            this.is_public = json.is_public;
            this.created_on = this.parseDate(json.created_on);
            this.updated_on = this.parseDate(json.updated_on);

            if (json.parent) {
                this.parent = new Project(json.parent);
            }
            if (json.trackers) {
                json.trackers.forEach((t) => {
                    this.trackers.push(new Tracker(t));
                });
            }

            if (json.issue_categories) {
                json.issue_categories.forEach((c) => {
                    this.issue_categories.push(new Category(c));
                });
            }
        }
    }
}

export class Query extends AbstractRedmineBean {
    public is_public: boolean;
    public project_id: number;

    constructor(json?: any) {
        super(json);
        if (json) {
            this.is_public = json.is_public;
            this.project_id = json.project_id;
        }
    }
}

export class Issue extends AbstractRedmineBean {

    public project: Project;
    public tracker: Tracker;
    public status: Status;
    public priority: Priority;
    public author: User;
    public assigned_to: User;
    public category: Category;
    public fixed_version: Version;
    public parent: Issue;
    public subject: string;
    public description: string;
    public start_date: Date;
    public due_date: Date;
    public done_ratio: number;
    public custom_fields: CustomField[] = [];
    public created_on: Date;
    public updated_on: Date;

    constructor(json: any) {
        super(json);
        if (json) {
            if (json.project) {
                this.project = new Project(json.project);
            }
            if (json.tracker) {
                this.tracker = new Tracker(json.tracker);
            }
            if (json.status) {
                this.status = new Status(json.status);
            }
            if (json.priority) {
                this.priority = new Priority(json.priority);
            }
            if (json.author) {
                this.author = new User(json.author);
            }
            if (json.assigned_to) {
                this.assigned_to = new User(json.assigned_to);
            }
            if (json.category) {
                this.category = new Category(json.category);
            }
            if (json.fixed_version) {
                this.fixed_version = new Version(json.fixed_version);
            }
            if (json.parent) {
                this.parent = new Issue(json.parent);
            }
            this.subject = json.subject;
            this.description = json.description;
            this.start_date = this.parseDate(json.start_date);
            this.due_date = this.parseDate(json.due_date);
            this.done_ratio = json.done_ratio;
            if (json.custom_fields) {
                json.custom_fields.forEach((value) => {
                    this.custom_fields.push(new CustomField(value));
                });
            }

            this.created_on = this.parseDate(json.created_on);
            this.updated_on = this.parseDate(json.updated_on);
        }
    }
}

export class CustomField extends AbstractRedmineBean {
    public value: string;

    constructor(json?: any) {
        super(json);
        if (json) {
            this.value = json.value;
        }
    }
}

export class User extends AbstractRedmineBean {
    public login: string;
    public gravatar: string;
    public firstname: string;
    public lastname: string;
    public mail: string;
    public created_on: Date;
    public last_login_on: Date;
    public api_key: string;
    public custom_fields: CustomField[] = [];

    constructor(json?: any) {
        super(json);
        if (json) {
            this.login = json.login;
            this.gravatar = json.gravatar;
            this.firstname = json.firstname;
            this.lastname = json.lastname;
            this.mail = json.mail;
            this.created_on = this.parseDate(json.created_on);
            this.last_login_on = this.parseDate(json.last_login_on);
            this.api_key = json.api_key;
            if (json.custom_fields) {
                json.custom_fields.forEach((value) => {
                    this.custom_fields.push(new CustomField(value));
                });
            }
        }
    }

    getDisplayLabel(): string {
        return `${this.firstname} ${this.lastname}`;
    }

}

export class Group extends AbstractRedmineBean {
    public user_ids: number[] = [];

    constructor(json?: any) {
        super(json);
        if (json) {
            this.user_ids = json.user_ids;
        }
    }
}

export class Role extends AbstractRedmineBean {
    public inherited: boolean;

    constructor(json?: any) {
        super(json);
        if (json) {
            this.inherited = json.inherited;
        }
    }
}

export class Tracker extends AbstractRedmineBean {

}

export class Status extends AbstractRedmineBean {

}

export class Priority extends AbstractRedmineBean {

}

export class Category extends AbstractRedmineBean {

}

export class Version extends AbstractRedmineBean {
    public project: Project;
    public description: string;
    public status: string;
    public due_date: number;
    public sharing: string;
    public created_on: number;
    public updated_on: number;
    constructor(json?: any) {
        super(json);
        if (json) {
            if (json.project) {
                this.project = new Project(json.project);
            }
            this.description = json.description;
            this.status = json.status;
            this.due_date = json.due_date;
            this.sharing = json.sharing;
            this.created_on = json.created_on;
            this.updated_on = json.updated_on;
        }
    }
}

export class Membership extends AbstractRedmineBean {
    public project: Project;
    public user: User;
    public group: Group;
    public roles: Role[] = [];

    constructor(json?: any) {
        super(json);
        if (json) {
            if (json.project) {
                this.project = new Project(json.project);
            }
            if (json.user) {
                this.user = new User(json.user);
            }
            if (json.group) {
                this.group = new Group(json.group);
            }
            if (json.roles) {
                json.roles.forEach((value) => {
                    this.roles.push(new Role(value));
                });
            }
        }
    }
}