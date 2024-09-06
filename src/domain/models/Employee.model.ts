export class Employee {
  public constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public sex?: string,
    public area_id?: number,
    public bulletin: number = 0,
    public description?: string,
    public role_ids: number[] = []
  ) {}
}
