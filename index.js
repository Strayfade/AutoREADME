
// ___________________________________________________________________________________________________

var username = 'Strayfade'          // This is your GitHub.com/[USERNAME] username.
var reponame = 'AutoREADME'   // This is your GitHub.com/[USERNAME]/[REPONAME] repository.
var badgeNumber = 4                      // Number of fancy Shields.io Badges. Recommended - 4
var badgestyle = 'flat-square'             // 'plastic', 'flat', 'flat-square', or 'for-the-badge'

// ___________________________________________________________________________________________________

const rp = require('request-promise')

var repositorLink = 'https://github.com/' + username + '/' + reponame + '?style=' + badgestyle
var versionsBadge = 'https://img.shields.io/github/v/release/' + username + '/' + reponame + '?style=' + badgestyle
var iCommitsBadge = 'https://img.shields.io/github/commit-activity/m/' + username + '/' + reponame + '?style=' + badgestyle
var repoSizeBadge = 'https://img.shields.io/github/repo-size/' + username + '/' + reponame + '?style=' + badgestyle
var licensesBadge = 'https://img.shields.io/github/license/' + username + '/' + reponame + '?style=' + badgestyle

var downloadBadge = 'https://img.shields.io/github/downloads/' + username + '/' + reponame + '/total'  + '?style=' + badgestyle

function constructBadge(badgeInt)
{
    if (badgeInt === 0)
    {
        var badge = '!' + '[]' + '(' + versionsBadge + ')'
        return badge
    }
    else if (badgeInt === 1)
    {
        var badge = '!' + '[]' + '(' + iCommitsBadge + ')'
        return badge
    }
    else if (badgeInt === 2)
    {
        var badge = '!' + '[]' + '(' + repoSizeBadge + ')'
        return badge
    }
    else if (badgeInt === 3)
    {
        var badge = '!' + '[]' + '(' + licensesBadge + ')'
        return badge
    }
    else if (badgeInt === 4)
    {
        var badge = '!' + '[]' + '(' + downloadBadge + ')'
        return badge
    }
}
function clamp(int, min, max)
{
    if (int < max)
    {
        if (int > min)
        {
            return int
        }
        else if (int < min)
        {
            return min
        }
    }
    else if (int > max)
    {
        return max
    }
}
function makeHeader(header, size)
{
    var newheader = ''
    for (var i = 0; i < size; i++)
    {
        newheader = newheader + '#'
    }
    return newheader + ' ' + header
}
rp(repositorLink)
.then(function(html)
{
    var README = ''
    README = README + makeHeader(reponame, 1) + '\n\n'
    var start = '<h2 class="mb-3 h4">About</h2>'
    var end = '</p>'
    var result = ''
    var result2 = ''
    html = html.toString()
    for (var i = html.indexOf(start); i < html.length; i++)
    {
        result = result + html.toString()[i]
    }
    for (var i = 0; i < result.indexOf(end); i++)
    {
        result2 = result2 + result[i]
    }
    result2 = result2.replace('    <p class="f4 mt-3">', '')
    result2 = result2.replace('<h2 class="mb-3 h4">About</h2>', '')
    for (var i = 0; i < result2.length; i++)
    {
        result2 = result2.replace('\n', '')
    }
    result2 = result2.replace('      ', '')
    if (!result2.startsWith('    <div class="f4'))
    {
        README = README + '**' + reponame + '**' + ': ' + result2 + '\n\n'
    }
    else
    {
        README = README + '*' + 'Developed by ' + username + '*'
        README = README + '\n\n'
    }
    for (var i = 0; i < badgeNumber; i++)
    {
        README = README + constructBadge(i) + '\n'
    }
    console.log(README)
})