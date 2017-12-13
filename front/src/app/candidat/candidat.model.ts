export class CandidatModel {
  /**
   * constructor for the model component
   * @param {string} firstname
   * @param {string} lastname
   * @param {string} email
   * @param {string} phone
   * @param {Event[]} events
   * @param {string} id
   * @param {string} photo
   */
  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public id?: string,
    public photo?: string
  ) {}
}
