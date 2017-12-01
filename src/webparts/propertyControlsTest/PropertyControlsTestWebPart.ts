import { DayOfWeek } from 'office-ui-fabric-react/lib/utilities/dateValues/DateValues';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import * as strings from 'PropertyControlsTestWebPartStrings';
import PropertyControlsTest from './components/PropertyControlsTest';
import { IPropertyControlsTestProps } from './components/IPropertyControlsTestProps';
import { IPropertyControlsTestWebPartProps } from './IPropertyControlsTestWebPartProps';
import { CalloutTriggers } from '../../PropertyFieldHeader';
import { PropertyFieldPeoplePicker, PrincipalType } from '../../PropertyFieldPeoplePicker';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '../../PropertyFieldListPicker';
import { PropertyFieldTermPicker } from '../../PropertyFieldTermPicker';
import { PropertyFieldDateTimePicker, DateConvention, TimeConvention } from '../../PropertyFieldDateTimePicker';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '../../PropertyFieldColorPicker';
import { PropertyFieldSpinButton } from '../../PropertyFieldSpinButton';
import { PropertyFieldDropdownWithCallout } from '../../PropertyFieldDropdownWithCallout';
import { PropertyFieldTextWithCallout } from '../../PropertyFieldTextWithCallout';
import { PropertyFieldToggleWithCallout } from '../../PropertyFieldToggleWithCallout';
import { PropertyFieldButtonWithCallout } from '../../PropertyFieldButtonWithCallout';
import { PropertyFieldCheckboxWithCallout } from '../../PropertyFieldCheckboxWithCallout';
import { PropertyFieldLabelWithCallout } from '../../PropertyFieldLabelWithCallout';
import { PropertyFieldLinkWithCallout } from '../../PropertyFieldLinkWithCallout';

/**
 * Web part that can be used to test out the various property controls
 */
export default class PropertyControlsTestWebPart extends BaseClientSideWebPart<IPropertyControlsTestWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPropertyControlsTestProps> = React.createElement(
      PropertyControlsTest,
      {
        context: this.context,
        people: this.properties.people || [],
        list: this.properties.singleList as string || "",
        multiList: this.properties.multiList as string[] || [],
        terms: this.properties.terms || [],
        datetime: this.properties.datetime || { value: null, displayValue: null },
        color: this.properties.color,
        spinValue: this.properties.spinValue,
        dropdownInfoHeaderKey: this.properties.dropdownInfoHeaderKey,
        textInfoHeaderValue: this.properties.textInfoHeaderValue,
        toggleInfoHeaderValue: this.properties.toggleInfoHeaderValue,
        checkboxWithCalloutValue: this.properties.checkboxWithCalloutValue
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    const dropdownInfoHeaderSelectedKey: string = this.properties.dropdownInfoHeaderKey || 'gryffindor';
    const dropdownInfoHeaderCallountContent: JSX.Element = this.getDropdownInfoHeaderCalloutContent();


    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldPeoplePicker('people', {
                  label: 'PropertyFieldPeoplePicker',
                  initialData: this.properties.people,
                  allowDuplicate: true,
                  principalType: [PrincipalType.Users, PrincipalType.SharePoint, PrincipalType.Security],
                  // principalType: [IPrincipalType.SharePoint],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'peopleFieldId'
                }),
                PropertyFieldListPicker('singleList', {
                  label: 'Select a list',
                  selectedList: this.properties.singleList,
                  includeHidden: false,
                  //baseTemplate: 109,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  // multiSelect: false,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                }),
                PropertyFieldListPicker('multiList', {
                  label: 'Select multiple lists',
                  selectedList: this.properties.multiList,
                  includeHidden: false,
                  //baseTemplate: 109,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  multiSelect: true,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'multiListPickerFieldId'
                }),
                PropertyFieldTermPicker('terms', {
                  label: 'Select terms',
                  panelTitle: 'Select terms',
                  initialValues: this.properties.terms,
                  allowMultipleSelections: true,
                  excludeSystemGroup: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  context: this.context,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'termSetsPickerFieldId'
                }),
                PropertyFieldDateTimePicker('datetime', {
                  label: 'Select the date and time',
                  disabled: false,
                  initialDate: this.properties.datetime,
                  // formatDate: this._formatDateIso,
                  dateConvention: DateConvention.DateTime,
                  timeConvention: TimeConvention.Hours12,
                  firstDayOfWeek: DayOfWeek.Monday,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'dateTimeFieldId'
                }),
                PropertyFieldColorPicker('color', {
                  label: 'Color',
                  selectedColor: this.properties.color,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  //disabled: true,
                  //alphaSliderHidden: true,
                  //style: PropertyFieldColorPickerStyle.Full,
                  //iconName: 'Precipitation',
                  key: 'colorFieldId'
                }),
                PropertyFieldSpinButton('spinValue', {
                  label: 'Spin Value',
                  initialValue: this.properties.spinValue,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  //disabled: true,
                  suffix: 'px',
                  min: 0,
                  max: 5,
                  step: 0.25,
                  decimalPlaces: 2,
                  //incrementIconName: 'CalculatorAddition',
                  //decrementIconName: 'CalculatorSubtract',
                  key: 'spinButtonFieldId'
                }),
                PropertyFieldDropdownWithCallout('dropdownInfoHeaderKey', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'dropdownInfoHeaderFieldId',
                  label: 'Select your house',
                  options: [{
                    key: 'gryffindor',
                    text: 'Gryffindor'
                  }, {
                    key: 'hufflepuff',
                    text: 'Hufflepuff'
                  }, {
                    key: 'ravenclaw',
                    text: 'Ravenclaw'
                  }, {
                    key: 'slytherin',
                    text: 'Slytherin'
                  }],
                  selectedKey: dropdownInfoHeaderSelectedKey,
                  calloutContent: dropdownInfoHeaderCallountContent
                }),
                PropertyFieldTextWithCallout('textInfoHeaderValue', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'textInfoHeaderFieldId',
                  label: 'Describe your PnP passion with few words',
                  calloutContent: React.createElement('span', {}, 'You can describe your passion with such words as strong, cosmic, all-absorbing, etc.'),
                  calloutWidth: 150,
                  value: this.properties.textInfoHeaderValue
                }),
                PropertyFieldToggleWithCallout('toggleInfoHeaderValue', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'toggleInfoHeaderFieldId',
                  label: 'Select your super hero universe',
                  calloutContent: React.createElement('p', {}, 'Select one of two universes of super heroes: DC comics with Superman, Batman, Wonder Woman, etc.; or Marvel with X-Men, Spider-Man, Avengers, etc.'),
                  onText: 'Marvel',
                  offText: 'DC Comics',
                  checked: this.properties.toggleInfoHeaderValue
                }),
                PropertyFieldButtonWithCallout('fakeProp', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'buttonWithCalloutFieldId',
                  calloutContent: React.createElement('p', {}, 'This is a test of the button with some description in callout'),
                  text: 'Button with callout',
                  onClick: () => { alert('Button is clicked'); }
                }),
                PropertyFieldCheckboxWithCallout('checkboxWithCalloutValue', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'checkboxWithCalloutFieldId',
                  calloutContent: React.createElement('p', {}, 'This is a test of the checkbox with some description in callout'),
                  text: 'Checkbox with callout',
                  checked: this.properties.checkboxWithCalloutValue
                }),
                PropertyFieldLabelWithCallout('fakeProp', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'LabelWithCalloutFieldId',
                  calloutContent: React.createElement('p', {}, 'This is a test of the label with some description in callout'),
                  text: 'Label with callout'
                }),
                PropertyFieldLinkWithCallout('fakeProp', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'LinkWithCalloutFieldId',
                  calloutContent: React.createElement('p', {}, 'This is a test of the link with some description in callout'),
                  text: 'Link with callout',
                  href: 'https://github.com/SharePoint/sp-dev-fx-property-controls',
                  target: '_blank'
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private getDropdownInfoHeaderCalloutContent(): JSX.Element {
    const selectedKey: string = this.properties.dropdownInfoHeaderKey;

    if (selectedKey) {
      return React.createElement('div', {}, `you have selected ${selectedKey}`);
    }
    else {
      return React.createElement('div', {}, `you haven't selecte any house`);
    }
  }
}
