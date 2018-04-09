// export const domain = process.env === 'development' ? 'http://localhost:8081/' : 'http://admin.yccw.superboss.cc';
// export const domain = 'http://localhost:8081'
export const domain = location.origin

export const queryCorpListUrl = `${domain}/corp/query`