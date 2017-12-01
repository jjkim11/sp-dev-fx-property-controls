import * as React from 'react';
import styles from './PropertyControlsTest.module.scss';
import { IPropertyControlsTestProps } from './IPropertyControlsTestProps';
import { escape } from '@microsoft/sp-lodash-subset';

/**
 * Property control test component that renders the property control values
 */
export default class PropertyControlsTest extends React.Component<IPropertyControlsTestProps, {}> {
  public render(): React.ReactElement<IPropertyControlsTestProps> {
    return (
      <div className={styles.propertyControlsTest}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-neutralLight ms-fontColor-neutralDark ${styles.row}`}>
            <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <p className="ms-font-xxl ms-fontColor-neutralDark">Property pane control values:</p>
              <p className="ms-font-m ms-fontColor-neutralDark">People: {this.props.people.map(p => {
                return !!p.fullName ? p.fullName : p.description;
              }).join(', ')}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">List: {this.props.list}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Multi List: {this.props.multiList.join(', ')}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Term(s): {this.props.terms.map(t => t.name).join(', ')}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Date: {this.props.datetime.displayValue}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Color: <span className={styles.colorBox} style={{backgroundColor:this.props.color}}>&nbsp;</span>{this.props.color}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Spin Value: {this.props.spinValue}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Dropdown Info Header Key: {this.props.dropdownInfoHeaderKey}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Text Info Header Value: {this.props.textInfoHeaderValue}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Toggle Info Header Value: {this.props.toggleInfoHeaderValue ? 'Marvel' : 'DC Comics'}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Checkbox with Callout Value: {(this.props.checkboxWithCalloutValue || '').toString()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
