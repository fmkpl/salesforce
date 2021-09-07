import { LightningElement, api, wire, track } from 'lwc';
import getAvailableProperties from '@salesforce/apex/firstStageController.getAvailableProperties';
import getContact from '@salesforce/apex/firstStageController.getContact';
import { createRecord } from 'lightning/uiRecordApi';
import { getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import PROPERTYVISIT_OBJECT from '@salesforce/schema/Property_Visit__c';
import CLIENT_FIELD from '@salesforce/schema/Property_Visit__c.Client__c';
import DATE_FIELD from '@salesforce/schema/Property_Visit__c.Date__c';
import PROP_FIELD from '@salesforce/schema/Property_Visit__c.Property__c';




const columns = [
    { label: 'Property Name', fieldName: 'Name' },
    { label: 'Property price', fieldName: 'Price__c', type: 'currency' },
    { label: 'City', fieldName: 'City__c' }
];

const date = new Date();
const dd = date.getDate();
const mm = date.getMonth()+1;
const yyyy = date.getFullYear();
const today = yyyy+'-'+mm+'-'+dd;

//const FIELDS = [OPPID_FIELD];


export default class FirstStage extends LightningElement {

    clientNameKey='';

    columns=columns;

    propCount=0;
    propertyNameKey='';
    propertyVisitId;

    todayDateKey=today;
  
    masPropNames=[];

    handleDateInput(event) {
        this.todayDateKey = event.target.value;
    }

    handleClientNameChange(event) {
        this.clientNameKey = event.target.value;
    }

    getSelectedName(event) {
        this.propCount++;
        const selectedRows = event.detail.selectedRows;
            for(let i = 0; i < selectedRows.length; i++) {
                this.masPropNames[i] = selectedRows[i].Id.toString();
                this.propertyNameKey = selectedRows[i].Id.toString();
                alert("you selected " + selectedRows[i].Name);
            }
    }

    createPropertyVisit() {
        for(let i=0;i<this.masPropNames.length;i++)
        {
            const fields = {};
            fields[CLIENT_FIELD.fieldApiName] = this.contact.data[0].Id;
            fields[DATE_FIELD.fieldApiName] = this.todayDateKey;
            fields[PROP_FIELD.fieldApiName] = this.masPropNames[i];
            //fields[OPP_FIELD.fieldApiName] = this.oppId;
            const recordInput = { apiName: PROPERTYVISIT_OBJECT.objectApiName, fields };
            createRecord(recordInput)
                .then(propertyVisit => {
                    this.propertyVisitId = propertyVisit.id;
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Property Visit created',
                            variant: 'success',
                        }),
                    );
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error creating record',
                            message: error.body.message,
                            variant: 'error',
                        }),
                    );
                });
        }

    }

    @wire(getAvailableProperties)
    props;

    @wire(getContact, {clientNameKey: '$clientNameKey'})
    contact;
}