/* eslint-disable no-param-reassign */
function findCity(list, id, level) {
    const Rarr = [];
    if (id) {
        const Nlist = list.find(i => i.adcode === id);
        Nlist.districts.forEach(i => {
            if (i.level === level) {
                Rarr.push({
                    adcode: i.adcode,
                    value: i.adcode,
                    label: i.name,
                    districts: i.districts
                });
            }
        });
    } else {
        list.forEach(i => {
            if (i.level === level) {
                Rarr.push({
                    adcode: i.adcode,
                    value: i.adcode,
                    label: i.name,
                    districts: i.districts
                });
            }
        });
    }
    // }
    return Rarr;
}

function returnType(list, type) {
    let data = [];
    list.forEach(i => {
        data.push(i[type]);
    });
    data = data.join(",");
    return data;
}

function downloadFile(data) {
    const blob = new Blob([data.data], { type: "application/vnd.ms-excel" });
    const url = window.URL.createObjectURL(blob);
    window.location.href = url;
}

function changeMenus(list, currentId, item) {
    let newList = [];
    list.forEach(i => {
        if (String(i.id) === String(currentId) && i.url === item.url) {
            i = Object.assign(i, item);
        } else if (i.children) {
            changeMenus(i.children, currentId, item);
        }
    });
    newList = list;
    return newList;
}

function deleteStage(id, list) {
    if (list) {
        list.forEach(i => {
            i.children.forEach((j, jndex) => {
                if (j.id === id) {
                    i.children.splice(jndex, 1);
                } else {
                    deleteStage(id, i.childrens);
                }
            });
        });
    }
}

function saveQuery(url, data) {
    sessionStorage.setItem(url, JSON.stringify(data));
}

function getQuery(url) {
    return JSON.parse(sessionStorage.getItem(url));
}

function handle(value) {
    try {
        const data = JSON.parse(value);
        if (typeof data === "object" && data) {
            return data;
        }
    } catch {
        return value;
    }
    return value;
}

function changeCurrentObj(id, name, list, data) {
    // 当前阶段id，当前阶段名称，数据，遍历数据
    list.forEach(i => {
        if ((Number(i.id) === Number(id) && i.url === name) || (Number(i.id) === Number(id) && i.url === "set")) {
            i.current = data;
        } else if (i.children) {
            changeCurrentObj(id, name, i.children, data);
        }
    });
}

function changeHash(hash, type, id) {
    const locationList = hash.split("&");
    let newHash = `#/${type}?id=${id}`;
    locationList.forEach((i, index) => {
        if (index > 0) {
            // eslint-disable-next-line no-multi-assign
            newHash += "&";
            newHash += i;
        }
    });
    window.location.hash = newHash;
}

const staticObj = {
    leagueImg: require("@/assets/League.png"),
    adartsImg: require("@/assets/Adarts.png")
};
const getYearList = () => {
    const year = new Date().getFullYear();
    const list = [{ id: 2020, year: 2020 }];
    for (let index = 2020; index < year; index += 1) {
        list.push({
            id: index + 1,
            year: index + 1
        });
    }
    return list;
};
export { findCity, downloadFile, returnType, deleteStage, saveQuery, getQuery, handle, changeCurrentObj, changeHash, changeMenus, staticObj, getYearList };