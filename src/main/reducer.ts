// standard action: {type: string, payload: any, ...}

var initialState = {
  rows: [],
};
export const requestListReducer = (state = [], action) => {
  switch (action.type) {
    case "VIEW_REQUESTLIST":
      //console.log(action.requestList)
      return {
        ...state,
        rows: action.data,
      };
    default:
      return state;
  }
};

export const newRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      //console.log(action.requestInfo);
      return {
        ...state,
        rows: [...state.rows, action.requestInfo],
      };
    default:
      return state;
  }
};
export const leiConnectionTreeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LEI_CONNECTION_TREE":
      // console.log("action.data", action.data);
      return {
        ...state,
        kpxConnectionTree: action.data,
      };
    case "NEW_LEI_CONNECTION_TREE":
      // console.log("action.data", action.data);
      return {
        ...state,
        newConnectionTree: action.data,
      };
    default:
      return state;
  }
};

export const getDataReducer = (state = [], action) => {
  switch (action.type) {
    case "LIST_OWNER":
      return {
        ...state,
        mnger: action.data,
      };
    case "LIST_OVERLAP":
      return {
        ...state,
        overlapList: action.data,
      };
    case "LIST_PORTFOLIO_ID":
      return {
        ...state,
        portfolioIdList: action.data,
      };
    case "LIST_SUM_STOCK_PER_OWNER":
      return {
        ...state,
        sumStockPerOwner: action.data,
      };
    case "LIST_RANK_COUNTRY":
      return {
        ...state,
        rankCountry: action.data,
      };
    case "LIST_RANK_SECTOR":
      return {
        ...state,
        rankSector: action.data,
      };
    case "LIST_2PORTFOLIOS":
      return {
        ...state,
        list2portfolios: action.data,
      };
    case "LIST_REQUEST_OVERLAP":
      return {
        ...state,
        listRequestOverlap: action.data,
      };
    case "LIST_FULL_PORTFOLIO":
      return {
        ...state,
        listPortfolio: action.data,
      };
    case "LIST_CONNECT_MESSAGE":
      return {
        ...state,
        listConnectMessage: action.data,
      };
    case "LIST_LEI_RELATIONSHIP":
      return {
        ...state,
        leiRelationship: action.data,
      };
    case "LIST_LEI_LEGALNAME":
      return {
        ...state,
        leiLegalName: action.data,
      };
    default:
      return state;
  }
};
export const kpxDataReducer = (state = [], action) => {
  switch (action.type) {
    case "KPX_DATA":
      return {
        ...state,
        kpxData: action.data,
      };
    case "KPX_OVERLAP":
      return {
        ...state,
        kpxOverlap: action.data,
      };
    case "KPX_Portfolio_id":
      return {
        ...state,
        kpxPortfolioid: action.data,
      };
    case "KPX_2Portfolio":
      return {
        ...state,
        kpx2Portfolio: action.data,
      };
    case "KPX_RANK_COUNTRY":
      return {
        ...state,
        kpxRankCountry: action.data,
      };
    case "KPX_RANK_Sector":
      return {
        ...state,
        kpxRankSector: action.data,
      };
    case "KPX_RANK_Industry":
      return {
        ...state,
        kpxRankIndustry: action.data,
      };
    case "KPX_LIST_PORTFOLIO":
      return {
        ...state,
        kpxListPortfolio: action.data,
      };
    case "KPX_REQUEST":
      return {
        ...state,
        kpxRequest: action.data,
      };
    case "KPX_RANK_RATING":
      return {
        ...state,
        kpxRankRating: action.data,
      };
    case "KPX_LEI_RELATIONSHIP":
      return {
        ...state,
        kpxLEIRelationship: action.data,
      };
    case "KPX_LEI_LEGALNAME":
      return {
        ...state,
        kpxLEILegalName: action.data,
      };
    case "KPX_ULTIMATE_PARENT":
      return {
        ...state,
        kpxUltimateParent: action.data,
      };
    case "TRANSPARENCY":
      return {
        ...state,
        transparencyData: action.data,
      };
    case "KPX_TRANSPARENCY_DATA":
      return {
        ...state,
        KpxTransparencyData: action.data,
      };
    case "KPX_LIST_REQUEST_OVERLAP":
      return {
        ...state,
        kpxListRequestOverlap: action.data,
      };
    case "KPX_TRANSPARENCY_RATING_DATA":
      return {
        ...state,
        kpxTransparencyRating: action.data,
      };
    case "SVL_REAL_IMPACT_GHG":
      return {
        ...state,
        svlRealImpact: action.data,
      };

    default:
      return state;
  }
};
export const demoReducer = (
  state = { wanttobuy_data: [], engagement_detail: [], engagementStatus: [] },
  action
) => {
  switch (action.type) {
    case "URTH_LEI_RELATIONSHIP":
      return {
        ...state,
        urth_lei_relationship: action.data,
      };
    case "URTH_PORTFOLIO":
      return {
        ...state,
        urth_portfolio: action.data,
      };
    case "FUNDS":
      return {
        ...state,
        funds_data: action.data,
      };
    case "WANTTOBUY":
      return {
        ...state,
        wanttobuy_data: action.data,
      };
    case "SUBMIT_WANTTOBUY":
      return {
        ...state,
        wanttobuy_data: [...state.wanttobuy_data, action.submitWantToBuy],
      };
    case "ENGAGEMENT":
      return {
        ...state,
        engagement: action.data,
      };
    case "ENGAGEMENT_DETAIL":
      return {
        ...state,
        engagement_detail: action.data,
      };
    case "SUBMIT_ENGAGEMENT_MESSAGE":
      return {
        ...state,
        engagement_detail: [...state.engagement_detail, action.data],
      };
    case "UPDATE_ENGAGEMENT_DATA":
      return {
        ...state,
        engagement: action.data,
      };
    case "NEW_ENGAGEMENT_STATUS":
      return {
        ...state,
        engagementStatus: [action.data, ...state.engagementStatus],
      };
    case "ENGAGEMENT_STATUS":
      return {
        ...state,
        engagementStatus: action.data,
      };
    case "ASSET_MNGERS":
      return {
        ...state,
        assetMngers: action.data,
      };
    case "ENGAGEMENT_MNGER_PERMISSION":
      return {
        ...state,
        engagementMngerPermission: action.data,
      };
    case "FEMALE_APPOINTED":
      return {
        ...state,
        femaleAppointed: action.data,
      };

    default:
      return state;
  }
};
