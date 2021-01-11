/* eslint-disable space-in-parens */
/* eslint-disable func-names */
/* eslint-disable overFlowStyle-in-parens */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-spaced-func */
/* eslint-disable indent */
/* eslint-disable quotes */

import Vue from "vue";
import VueRouter from "vue-router";
import login from "@/views/index/login";

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error);
};
// eslint-disable-next-line overFlowStyle-before-function-paren
Vue.use(VueRouter);
const routes = [{
        path: "/",
        name: "login",
        component: login
    },
    {
        path: "/index",
        name: "index",
        component: () =>
            import ( /* webpackChunkName: "index" */ "../views/index/index.vue"),
        children: [
            // AdditionalOption 模块
            {
                path: "/holiday",
                name: "Holiday",
                component: () =>
                    import ( /* webpackChunkName: "Holiday" */ "../views/More/Holiday/Holiday.vue"),
                meta: [{ name: "all.tip434", url: "/holiday" }]
            },
            {
                path: "/template",
                name: "Template",
                component: () =>
                    import ( /* webpackChunkName: "Template" */ "../views/More/Template/Template.vue"),
                meta: [{ name: "all.tip14", url: "/template" }]
            },
            {
                path: "/operator",
                name: "operator",
                component: () =>
                    import ( /* webpackChunkName: "Operator" */ "../views/More/OperAtor/OperAtor.vue"),
                meta: [{ name: "all.tip531", url: "/operator" }]
            },
            // Judgement 模块
            {
                path: "/judgement",
                name: "judgement",
                component: () =>
                    import ( /* webpackChunkName: "Judgement" */ "../views/Judgement/Judgement.vue"),
                meta: [{ name: "all.tip362", url: "/judgement" }]
            },
            {
                path: "/teamList",
                name: "teamList",
                component: () =>
                    import ( /* webpackChunkName: "teamList" */ "../views/Judgement/teamList.vue"),
                meta: [{ name: "all.tip362", url: "/judgement" }, { name: "all.tip363", url: "/teamList" }]
            },
            {
                path: "/playerList",
                name: "playerList",
                component: () =>
                    import ( /* webpackChunkName: "playerList" */ "../views/Judgement/playerList.vue"),
                meta: [{ name: "all.tip362", url: "/judgement" }, { name: "all.tip543", url: "/playerList" }]
            },
            {
                path: "/teamMatch",
                name: "teamMatch",
                component: () =>
                    import ( /* webpackChunkName: "match" */ "../views/Judgement/teamMatch.vue"),
                meta: [{ name: "all.tip362", url: "/judgement" }, { name: "all.tip363", url: "/teamList" }, { name: "all.tip365", url: "/teamMatch" }]
            },
            {
                path: "/playerMatch",
                name: "playerMatch",
                component: () =>
                    import ( /* webpackChunkName: "match" */ "../views/Judgement/playerMatch.vue"),
                meta: [{ name: "all.tip362", url: "/judgement" }, { name: "all.tip543", url: "/playerList" }, { name: "all.tip365", url: "/playerMatch" }]
            },
            {
                path: "/teamGameRecord",
                name: "teamGameRecord",
                component: () =>
                    import ( /* webpackChunkName: "gameRecord" */ "../views/Judgement/teamGameRecord.vue"),
                meta: [{ name: "all.tip362", url: "/judgement" }, { name: "all.tip363", url: "/teamList" }, { name: "all.tip365", url: "/teamMatch" }, { name: "all.tip542", url: "/gameRecord" }]
            },
            {
                path: "/playerGameRecord",
                name: "playerGameRecord",
                component: () =>
                    import ( /* webpackChunkName: "gameRecord" */ "../views/Judgement/playerGameRecord.vue"),
                meta: [{ name: "all.tip362", url: "/judgement" }, { name: "all.tip543", url: "/playerList" }, { name: "all.tip365", url: "/playerMatch" }, { name: "all.tip542", url: "/gameRecord" }]
            },
            // League 模块
            {
                path: "/league",
                name: "league",
                component: () =>
                    import ( /* webpackChunkName: "league" */ "../views/League/League/league.vue"),
                meta: [{ name: "all.tip2", url: "/league" }]
            },
            // Template 比赛模板
            {
                path: "/templateIndex",
                name: "TemplateIndex",
                component: () =>
                    import ( /* webpackChunkName: "templateIndex" */ "../views/League/League/Template/index.vue"),
                children: [{
                        path: "/competition",
                        name: "/competition",
                        component: () =>
                            import ( /* webpackChunkName: "competition" */ "../views/League/League/Template/Competition.vue"),
                        meta: [{ name: "all.tip2", url: "/league" }, { name: "all.tip454", url: "/competition" }]
                    },
                    {
                        path: "/category",
                        name: "/category",
                        component: () =>
                            import ( /* webpackChunkName: "category" */ "../views/League/League/Template/Category.vue"),
                        meta: [{ name: "all.tip2", url: "/league" }, { name: "all.tip454", url: "/competition" }, { name: "all.tip51", url: "/category" }]
                    },
                    {
                        path: "/division",
                        name: "/division",
                        component: () =>
                            import ( /* webpackChunkName: "division" */ "../views/League/League/Template/Division.vue"),
                        meta: [{ name: "all.tip2", url: "/league" }, { name: "all.tip454", url: "/competition" }, { name: "all.tip51", url: "/category" }, { name: "all.tip52", url: "/division" }]
                    },
                    {
                        path: "/stage",
                        name: "/stage",
                        component: () =>
                            import ( /* webpackChunkName: "stage" */ "../views/League/League/Template/Stage.vue"),
                        meta: [{ name: "all.tip2", url: "/league" }, { name: "all.tip454", url: "/competition" }, { name: "all.tip51", url: "/category" }, { name: "all.tip52", url: "/division" }, { name: "all.tip21", url: "/stage" }]
                    },
                    {
                        path: "/set",
                        name: "/set",
                        component: () =>
                            import ( /* webpackChunkName: "set" */ "../views/League/League/Template/Set.vue"),
                        meta: [{ name: "all.tip2", url: "/league" }, { name: "all.tip454", url: "/competition" }, { name: "all.tip51", url: "/category" }, { name: "all.tip52", url: "/division" }, { name: "all.tip21", url: "/stage" }, { name: "all.tip53", url: "/set" }]
                    }
                ],
                meta: [{ name: "all.tip2", url: "/league" }, { name: "all.tip454", url: "/competition" }]
            },
            {
                path: "/resultMgmt",
                name: "resultMgmt",
                component: () =>
                    import ( /* webpackChunkName: "resultMgmt" */ "../views/League/Result/resultMgmt.vue"),
                meta: [{ name: "all.tip2", url: "/league" }, { name: "all.tip32", url: "/resultMgmt" }]
            },
            {
                path: "/entry",
                name: "entry",
                component: () =>
                    import ( /* webpackChunkName: "entry" */ "../views/League/Entry/entry.vue"),
                meta: [{ name: "all.tip240", url: "/entry" }]
            },
            {
                path: "/assign",
                name: "assign",
                component: () =>
                    import ( /* webpackChunkName: "Assign" */ "../views/League/Entry/assign.vue"),
                meta: [{ name: "all.tip240", url: "/entry" }, { name: "all.tip264", url: "/assign" }]
            },
            {
                path: "/entryList",
                name: "entryList",
                component: () =>
                    import ( /* webpackChunkName: "entryList" */ "../views/League/Entry/entryList.vue"),
                meta: [{ name: "all.tip240", url: "/entry" }, { name: "all.tip243", url: "/entryList" }]
            },
            {
                path: "/personal",
                name: "personal",
                component: () =>
                    import ( /* webpackChunkName: "personal" */ "../views/League/Entry/personal.vue"),
                meta: [{ name: "all.tip240", url: "/entry" }, { name: "all.tip243", url: "/entryList" }]
            },
            {
                path: "/member",
                name: "member",
                component: () =>
                    import ( /* webpackChunkName: "Member" */ "../views/League/Entry/member.vue"),
                meta: [{ name: "all.tip240", url: "/entry" }, { name: "all.tip243", url: "/entryList" }, { name: "all.tip411", url: "/member" }]
            },
            {
                path: "/assignedTeams",
                name: "assignedTeams",
                component: () =>
                    import ( /* webpackChunkName: "assignedTeams" */ "../views/League/Entry/assignedTeams.vue"),
                meta: [{ name: "all.tip240", url: "/entry" }, { name: "all.tip64", url: "/assign" }, { name: "all.tip452", url: "/assignedTeams" }]
            },
            // MatchTable 模块
            {
                path: "/matchTable",
                name: "matchTable",
                component: () =>
                    import ( /* webpackChunkName: "matchTable" */ "../views/League/MatchTable/matchTable.vue"),
                meta: [{ name: "all.tip270", url: "/matchTable" }]
            },
            {
                path: "/matchTableList",
                name: "matchTableList",
                component: () =>
                    import ( /* webpackChunkName: "matchTableList" */ "../views/League/MatchTable/matchTableList.vue"),
                meta: [{ name: "all.tip270", url: "/matchTable" }, { name: "all.tip450", url: "/matchTableList" }]
            },
            {
                path: "/knockout",
                name: "knockout",
                component: () =>
                    import ( /* webpackChunkName: "knockout" */ "../views/League/MatchTable/knockout.vue"),
                meta: [{ name: "all.tip270", url: "/matchTable" }, { name: "all.tip450", url: "/matchTableList" }, { name: "all.tip449", url: "/knockout" }]
            },
            {
                path: "/matchTableStage",
                name: "matchTableStage",
                component: () =>
                    import ( /* webpackChunkName: "matchTableStage" */ "../views/League/MatchTable/matchTableStage.vue"),
                meta: [{ name: "all.tip270", url: "/matchTable" }, { name: "all.tip450", url: "/matchTableList" }, { name: "all.tip21", url: "/matchTableStage" }]
            },
            // Player  模块
            {
                path: "/playerMgmt",
                name: "playerMgmt",
                component: () =>
                    import ( /* webpackChunkName: "result" */ "../views/Player/PlayerMgmt.vue"),
                meta: [{ name: "all.tip419", url: "/playerMgmt" }]
            },
            {
                path: "/playerInformation",
                name: "playerInformation",
                component: () =>
                    import ( /* PlayerInformation: "result" */ "../views/Player/PlayerInformation.vue"),
                meta: [{ name: "all.tip419", url: "/playerMgmt" }, { name: "all.tip453", url: "/playerInformation" }]
            },
            {
                path: "/playerManagement",
                name: "playerManagement",
                component: () =>
                    import ( /* PlayerManagement: "result" */ "../views/Player/PlayerManagement.vue"),
                meta: [{ name: "all.tip419", url: "/playerMgmt" }, { name: "all.tip453", url: "/playerManagement" }]
            },
            // Team  模块
            {
                path: "/teamMgmt",
                name: "teamMgmt",
                component: () =>
                    import ( /* webpackChunkName: "result" */ "../views/Team/TeamMgmt.vue"),
                meta: [{ name: "all.tip377", url: "/teamMgmt" }]
            },
            {
                path: "/teamInformation",
                name: "teamInformation",
                component: () =>
                    import ( /* webpackChunkName: "TeamInformation" */ "../views/Team/TeamInformation.vue"),
                meta: [{ name: "all.tip377", url: "/teamMgmt" }, { name: "all.tip384", url: "/teamInformation" }]
            },
            // Result 模块
            {
                path: "/result",
                name: "result",
                component: () =>
                    import ( /* webpackChunkName: "result" */ "../views/League/Result/result.vue"),
                meta: [{ name: "all.tip32", url: "/result" }]
            },
            {
                path: "/resultInformation",
                name: "resultInformation",
                component: () =>
                    import ( /* webpackChunkName: "ResultInformation" */ "../views/League/Result/ResultInformation.vue"),
                meta: [{ name: "all.tip32", url: "/result" }, { name: "all.tip451", url: "/resultInformation" }]
            },
            // Schedule 模块
            {
                path: "/schedule",
                name: "schedule",
                component: () =>
                    import ( /* webpackChunkName: "schedule" */ "../views/League/Schedule/schedule.vue"),
                meta: [{ name: "all.tip301", url: "/schedule" }]
            },
            // Stats 模块
            {
                path: "/competitionStats",
                name: "CompetitionStats",
                component: () =>
                    import ( /* webpackChunkName: "CompetitionStats" */ "../views/Stats/competitionStats.vue"),
                meta: [{ name: "all.tip440", url: "/competitionStats" }]
            },
            {
                path: "/playerAward",
                name: "PlayerAward",
                component: () =>
                    import ( /* webpackChunkName: "CompetitionStats" */ "../views/Stats/playerAward.vue"),
                meta: [{ name: "all.tip343", url: "/playerAward" }]
            },
            {
                path: "/teamAward",
                name: "TeamAward",
                component: () =>
                    import ( /* webpackChunkName: "CompetitionStats" */ "../views/Stats/teamAward.vue"),
                meta: [{ name: "all.tip360", url: "/teamAward" }]
            },
            {
                path: "/news",
                name: "News",
                component: () =>
                    import ( /* webpackChunkName: "News" */ "../views/news/news.vue"),
                meta: [{ name: "all.tip595", url: "/news" }]
            },
            {
                path: "/createNews",
                name: "CreateNews",
                component: () =>
                    import ( /* webpackChunkName: "createNews" */ "../views/news/createNews.vue"),
                meta: [{ name: "all.tip595", url: "/news" }, { name: "all.tip602", url: "/createNews" }]
            },
            {
                path: "/banner",
                name: "Banner",
                component: () =>
                    import ( /* webpackChunkName: "banner" */ "../views/news/banner.vue"),
                meta: [{ name: "all.tip608", url: "/banner" }]
            },
            {
                path: "/createBanner",
                name: "CreateBanner",
                component: () =>
                    import ( /* webpackChunkName: "createBanner" */ "../views/news/createBanner.vue"),
                meta: [{ name: "all.tip608", url: "/banner" }, { name: "all.tip614", url: "/createBanner" }]
            },
            {
                path: "/icon",
                name: "Icon",
                component: () =>
                    import ( /* webpackChunkName: "icon" */ "../views/news/icon.vue"),
                meta: [{ name: "all.tip619", url: "/icon" }]
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

// eslint-disable-next-line eol-last
export default router;