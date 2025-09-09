import { environment } from "src/environments/environment";

export const API_BASE_URL = environment.apiUrl;
export const UploadPath='https://tihcl.s3.us-east-1.amazonaws.com/'
export const APIS = {
    programCreation:{
        addprogram: API_BASE_URL + '/program/create',
        addSessions: API_BASE_URL + '/program/session/create',
        addLocation: API_BASE_URL + '/location/save',
        getLocation: API_BASE_URL + '/agency/locations/',
        getLocationByAgency: API_BASE_URL + '/agency/locationdetails/',
        getResource: API_BASE_URL + '/agency/resources/',
        addResource: API_BASE_URL + '/resource/save',
        getProgramsList: API_BASE_URL + '/programs',
        getProgramsListByAgency: API_BASE_URL + '/agency/programs/',
        getSingleProgramsList: API_BASE_URL + '/program/',
        getActivityList: API_BASE_URL + '/activities',
        getSubActivityListByActivity: API_BASE_URL + '/activityById',
        getESDPProgram: API_BASE_URL + '/getESDPTraining',
        addESDPProgram: API_BASE_URL + '/SaveESDPTraining',
        updateProgram: API_BASE_URL + '/updateProgram',        
        // get: API_BASE_URL + '/program/get',
        // update: API_BASE_URL + '/program/update',
        // delete: API_BASE_URL + '/program/delete',
    },
    participantdata:{
        add: API_BASE_URL + '/participant/save',
        update: API_BASE_URL + '/updateParticipant',
        getDataByProgramId: API_BASE_URL + '/program/participants/',
        saveOrgnization: API_BASE_URL + '/organization/save',
        getOrgnizationData: API_BASE_URL + '/organization/list',
        getParticipantList: API_BASE_URL + '/participants',
        getParticipantListByAgency: API_BASE_URL + '/agency/participants/',
        getParticipantDetailsById: API_BASE_URL + '/getParticipantById/',
    },
    counsellerData:{
        add: API_BASE_URL + '/saveCounsellor',
        getData: API_BASE_URL + '/getAllCounsellors',
    },
    userRegistration:{
        add: API_BASE_URL + '/login/user/create',
        addAgent: API_BASE_URL + '/login/user/create',        
    },
    masterList: {
        agencyList: API_BASE_URL + '/agencies',
        locationList: API_BASE_URL + '/locations',
        getUserList: API_BASE_URL + '/login/allusrs',
        getresources: API_BASE_URL + '/resources',
        getDistricts: API_BASE_URL + '/getAllDistricts',
        getMandal: API_BASE_URL + '/getAllmandalsOfDistrictsById/',
    },
    captureOutcome:{
        getParticipantData: API_BASE_URL + '/getParticipantsByMobileNo/',
        getOutcomelistData: API_BASE_URL + '/program/outcome/tables',
        getDynamicFormDataBasedOnOutCome: API_BASE_URL + '/program/outcome/details/',
        saveOutComes:API_BASE_URL + '/program/outcome/save/',
    },


    // TIHCL MANAGER APIS
      tihclMasterList: {
        getDistricts: API_BASE_URL + '/getAllDistricts',
        getMandal: API_BASE_URL + '/getAllmandalsOfDistrictsById/',
        getIndustrialByDistrict: API_BASE_URL + '/industrial-parks/',
        getNotifications: API_BASE_URL + '/notifications/userType?userRole=',
        readNotification: API_BASE_URL + '/notifications/mark-read',
        changePassword: API_BASE_URL + '/auth/update/password',
    },
    tihclEnterprenuer:{
        submitLoanApplication: API_BASE_URL + '/registrations/save',
    },
    tihclExecutive:{
        getNewApplications:API_BASE_URL+`/registrations/new/applications`,
        getPendingApplications:API_BASE_URL+`/registrations/under-processing`,
        registerData: API_BASE_URL + '/registrations/usage/id/',
        submitPrimilinary:API_BASE_URL+`/registrations/preliminary/save/`,
        saveUnitVisit:API_BASE_URL+`/unitvisit/save`,
        updateUnitVisit:API_BASE_URL+`/unitvisit/update/`,
        getUnitVisit:API_BASE_URL+`/unitvisit/fetch/`,
        getUnitVisitDelete:API_BASE_URL+`/unitvisit/delete/`,
        getUnitVisitById:API_BASE_URL+`/unitvisit/fetch/registration/`,
        getSentiondataById:API_BASE_URL+`/sanction/details/registration/id/`,
        saveRampCheckList:  API_BASE_URL+`/rampchecklist/save`,
        getRampCheckList:API_BASE_URL+'/rampchecklist/fetch/registration/id/',
        saveSanction:  API_BASE_URL+`/sanction/details/save`,
        saveDisbursement:  API_BASE_URL+`/disbursement/details/save`,
        getdisbursementDelete:API_BASE_URL+`/disbursement/details/disbursement/id/`,
        getDiagnostic:API_BASE_URL+'/diagnostic-reports/getBy/usage/',
        saveDiagnostic:API_BASE_URL+'/diagnostic-reports/save',
        getSanctionRid:API_BASE_URL+'/sanction/details/registration/id/',
        getDisbursementRid:API_BASE_URL+'/disbursement/details/registration/id/',
        deleteDiagnostics:{
        deleteShareholding:API_BASE_URL+'/diagnostic-reports/Shareholding/delete/',
        deleteBalanceSheet:API_BASE_URL+'/diagnostic-reports/balance-sheet/',
        deleteBuyer:API_BASE_URL+'/diagnostic-reports/buyer/delete/',
        deletepayable:API_BASE_URL+'/diagnostic-reports/payable/delete/',
        deletereceivable:API_BASE_URL+'/diagnostic-reports/receivable/delete/',
        deleteseller:API_BASE_URL+'/diagnostic-reports/seller/delete/',
        deleteunsecured:API_BASE_URL+'/diagnostic-reports/unsecured-loans/',
        deleteorderBookPosition:API_BASE_URL+'/diagnostic-reports/orderBookPosition/delete/',

        }


    },
    tihclManager:{
        getLevelOneData: API_BASE_URL + '/registrations/status?status=PRELIMINARY_ASSESSMENT',
        getLevelTwoData: API_BASE_URL + '/registrations/status?status=DIAGNOSTIC_REPORT',
        getLevelThreeData:API_BASE_URL + '/registrations/status?status=SANCTION_LETTER_UPLOAD',
        approveLevelOne: API_BASE_URL + '/registrations/status/updation/',
        approveLevelTwo: API_BASE_URL + '/programs/level2/approve/',
        approveLevelThree: API_BASE_URL + '/programs/level3/approve/',
        rejectLevelOne: API_BASE_URL + '/programs/level1/reject/',
        rejectLevelTwo: API_BASE_URL + '/programs/level2/reject/',
        rejectLevelThree: API_BASE_URL + '/programs/level3/reject/',    
    },
      tihclDIC:{
        getLevelDICData: API_BASE_URL + '/registrations/status?status=MANAGER_APPROVAL_2',
        approveLevelDIC: API_BASE_URL + '/programs/level2/approve/',    
        updateRgistrationwithDic:API_BASE_URL + '/registrations/update/dicNocFilePath/', 
        updateRgistrationwithprimaryLenderNoc:API_BASE_URL + '/registrations/update/primaryLenderNocFilePath/',
    },
      tihclCOI:{
        getApplicaionData: API_BASE_URL + '/registrations/application/status?',
        getNumericData: API_BASE_URL + '/application/counts?district=',
    },
    tihcl_uploads:{
        
       globalUpload: API_BASE_URL + '/files/upload',    
    }

}