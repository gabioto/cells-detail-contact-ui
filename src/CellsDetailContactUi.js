import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './cells-detail-contact-ui.css.js';
import '@bbva-experience-components/bbva-list-bullet/bbva-list-bullet.js';
import '@bbva-experience-components/bbva-header-category/bbva-header-category.js';

/**
 * ![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)
 *
 * This component ...
 *
 * Example:
 *
 * ```html
 *   <cells-detail-contact-ui></cells-detail-contact-ui>
 * ```
 */
export class CellsDetailContactUi extends LitElement {
  static get properties() {
    return {
      /**
       * Description for property
       */
      contactDetails: {
        type: {},
      },
    };
  }

  constructor() {
    super();
    this.contactDetails = {};
    this.correos = [];
    this.telefonos = [];
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('cells-detail-contact-ui-shared-styles'),
    ];
  }

  updated(propsChanged) {
    super.update(propsChanged);
    if (propsChanged.has('contactDetails')) {
      this.contactDetailsMapper();
    }
  }
  contactDetailsMapper() {
    if (this.contactDetails) {
      this.telefonos = this.contactDetails.data.filter(
        (element) => element.contactType.id == 'MOBILE_NUMBER'
      );
      this.correos = this.contactDetails.data.filter(
        (element) => element.contactType.id == 'EMAIL'
      );
    }
  }

  render() {
    return html`
      <bbva-header-category
        id="header"
        text="Detalle del contacto"
        class="upper-case bottom-small-padding"
      ></bbva-header-category>

      ${this.telefonos.length > 0
        ? html`
            <span slot="title">Teléfono móvil</span>
            ${this.telefonos.map(
              (element) => html`
                <bbva-list-bullet>"${element.contact}"</bbva-list-bullet>
              `
            )}
          `
        : ''}
      ${this.correos.length > 0
        ? html`
            <span slot="title">Correos</span>
            ${this.correos.map(
              (element) => html`
                <bbva-list-bullet>"${element.contact}"</bbva-list-bullet>
              `
            )}
          `
        : ''}
      <slot></slot>
    `;
  }
}
