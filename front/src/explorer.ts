class Explorer {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  get_path(this: this) {
    return `${this.path}`;
  }
}

export default Explorer;
