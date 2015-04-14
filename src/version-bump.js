import semver from "semver";
function bump(current, type, preid){
    var isValid = semver.valid(current);
    if(isValid == null)
    {
        throw new Error("Invalid Version Number");
    }
    var vb = semver.inc(current, type, preid);
    if(vb == null)
    {
        throw new Error("Invalid Release Type");
    }
    if(semver.gt(current, vb))
    {
        throw new Error("Invalid Prerelease Name");
    }
    return vb;
}

export{bump};