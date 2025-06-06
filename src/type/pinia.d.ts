/**
 * pinia 类型定义
 */

// 用户信息
declare interface UserInfos<T = any> {
	token: string;
	authBtnList: string[];
	photo: string;
	roles: string[];
	time: number;
	userName: string;
	userId: number;
	[key: string]: T;
}
declare interface UserInfosState {
	userInfos: UserInfos;
}

// 路由缓存列表
declare interface KeepAliveNamesState {
	keepAliveNames: string[];
	cachedViews: string[];
}

// 后端返回原始路由(未处理时)
declare interface RequestOldRoutesState {
	requestOldRoutes: string[];
}

// TagsView 路由列表
declare interface TagsViewRoutesState<T = any> {
	tagsViewRoutes: T[];
	isTagsViewCurrenFull: Boolean;
}

// 路由列表
declare interface RoutesListState<T = any> {
	routesList: T[];
	isColumnsMenuHover: Boolean;
	isColumnsNavHover: Boolean;
}

// 布局配置
declare interface ThemeConfigState {
	themeConfig: {
		isDrawer: boolean;
		primary: string;
		topBar: string;
		topBarColor: string;
		isTopBarColorGradual: boolean;
		menuBar: string;
		menuBarColor: string;
		menuBarActiveColor: string;
		isMenuBarColorGradual: boolean;
		columnsMenuBar: string;
		columnsMenuBarColor: string;
		columnsMenuBarActiveColor: string;
		isColumnsMenuBarColorGradual: boolean;
		isColumnsMenuHoverPreload: boolean;
		isCollapse: boolean;
		isUniqueOpened: boolean;
		isFixedHeader: boolean;
		isFixedHeaderChange: boolean;
		isClassicSplitMenu: boolean;
		isLockScreen: boolean;
		lockScreenTime: number;
		isShowLogo: boolean;
		isShowLogoChange: boolean;
		isBreadcrumb: boolean;
		isTagsview: boolean;
		isBreadcrumbIcon: boolean;
		isTagsviewIcon: boolean;
		isCacheTagsView: boolean;
		isSortableTagsView: boolean;
		isShareTagsView: boolean;
		isFooter: boolean;
		isGrayscale: boolean;
		isInvert: boolean;
		isIsDark: boolean;
		isWatermark: boolean;
		watermarkText: string;
		tagsStyle: string;
		animation: string;
		columnsAsideStyle: string;
		columnsAsideLayout: string;
		layout: string;
		isRequestRoutes: boolean;
		globalTitle: string;
		globalViceTitle: string;
		globalViceTitleMsg: string;
		globalComponentSize: string;
		isCreateWebHistory: boolean;
	};
}

// 字典缓存
declare interface DictListsState {
	dictListInfo: {
		feePaymentMethod: DictGetListDto[];
		businessType: DictGetListDto[];
		invoiceType: DictGetListDto[];
		payStatus: DictGetListDto[];
		technicalDisclosureLevel: DictGetListDto[];
		caseStatus: DictGetListDto[];
		customerForm: DictGetListDto[];
		maintenanceCycle: DictGetListDto[];
		paymentStatus: DictGetListDto[];
		invoicingState: DictGetListDto[];
		applicationType: DictGetListDto[];
		legalStatus: DictGetListDto[];
		fallCertificationStatus: DictGetListDto[];
		postStatus: DictGetListDto[];
		trademarkBusinessType: DictGetListDto[];
		trademarkCategory: DictGetListDto[];
		declareMethod: DictGetListDto[];
		bidStatus: DictGetListDto[];
		winBidStatus: DictGetListDto[];
		settlementPeriod: DictGetListDto[];
		businessServeType: DictGetListDto[];
		reviewResultsFirstRound: DictGetListDto[];
		reviewResultsSecondRound: DictGetListDto[];
		reviewResultsFeedback: DictGetListDto[];
		certificateStatus: DictGetListDto[];
		internationalPatentStatus: DictGetListDto[];
		patentStatus: DictGetListDto[];
		softStatus: DictGetListDto[];
		trademarkStatus: DictGetListDto[];
		biddingArea: DictGetListDto[];
	};
}
