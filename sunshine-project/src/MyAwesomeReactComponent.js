import React, {Component} from 'react';
import Display from './Display';
import AutoComplete from 'material-ui/AutoComplete';

/**
 * `AutoComplete` search text can be implemented as a controlled value,
 * where `searchText` is handled by state in the parent component.
 * That value is reseted with the `onNewRequest` callback.
 */
export default class SearchBar extends Component {
  state = {
    searchText: '',
    displayContent: '',
    currentScore: '',
    currentRank: ''
  };

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText,
    });
  };

  // handleNewRequest = () => {
  //   this.setState({
  //     searchText: '',
  //   });
  // };

  calculateOverallScore = (countyObject) => {
    var overallScore = 0
      for (var metric in countyObject) {
        var doubleCertainCategories = (categoryName) => {
          var doubleThese = ['Budget', 'Meetings', 'Elected Officials', 'Administrative Officials', 'Public Records']
          var returnMultiplier = doubleThese.includes(categoryName) ? 2 : 1
          return returnMultiplier
        }
        overallScore += Number(countyObject[metric]["Answer"] * doubleCertainCategories(metric))
      }
    return overallScore
  }

  calculateRank = (countyName) => {
    var countyScores = []
    for (var county in counties){
      countyScores.push([county, this.calculateOverallScore(counties[county])])
    }
    var sorted = countyScores.sort(function(a, b) {
        return b[1] - a[1];
    });
    var relevantCountyArray = sorted.filter(function(countyArray){
        return countyArray[0] === countyName
       })
    return sorted.indexOf(relevantCountyArray[0]) + 1
  }

  onNewRequest = (searchTerm) => {
    this.setState({
      displayContent: counties[searchTerm],
      currentScore: 'Overall Score: ' + this.calculateOverallScore(counties[searchTerm]) + '/14',
      currentRank: 'Rank: ' + this.calculateRank(searchTerm) + ' of ' + Object.keys(counties).length + ' counties measured'
    });
  }



  render() {
    return (
      <div id="autoComplete">
        <AutoComplete
          hintText="Type a county name"
          filter= {(searchText, key) =>
            (key.toLowerCase().includes(searchText.toLowerCase()))}
          searchText={this.state.searchText}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.onNewRequest}
          dataSource={Object.keys(counties)}
          style={{width: '100%', textAlign: 'center'}}
          textFieldStyle={{fontSize: '4vw', width: '100%'}}
          listStyle={{ maxHeight: 200, overflow: 'auto', width: 500}}
          // filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          openOnFocus={true}
        />
        <Display displayContent={this.state.displayContent}
          currentScore={this.state.currentScore}
          currentRank={this.state.currentRank}/>
      </div>
    );
  }
}



const counties =
  {'Albany':
    {'Budget': {'Answer': '1', 'Explanation': "Easily located with devoted budget page. Includes PDF downloads of both Executive and Adopted budget books dating back to 2012. Also has tabular data in Excel format along with expansive number of documents relating to finance, including financial plan, summary budgets, exemption impact report and a summary of budget changes."},
      'Meetings': {'Answer': '1', 'Explanation': 'Under "County Government at Work" tab. Includes seating chart for legislature. Has agendas, minutes and link to video. Has "Agenda backup" documents as required by Open Meetings law. Meetings livestream via website. Schedule of committee meetings along with agendas and video.'},
      'Elected Officials': {'Answer': '.5', 'Explanation': "All contact information available. Also has home numbers and cell numbers for some for County Legislators. Does not include committee assignments or conflict of interest statements."},
      'Administrative Officials': {'Answer': '1', 'Explanation': 'Under "Departments and Offices." Has contact information for department heads.'},
      'Audits': {'Answer': '.5', 'Explanation': "Under Albany County Comptroller. Has some audits, reviews and financial reports. Annual financial reports available only for 2008 through 2012. Other audits have most recent date of 2011."},
      'Contracts': {'Answer': '.5', 'Explanation': "Summary data for contracts provided via agendas with the Contract Administration Board."},
      'Lobbying': {'Answer': '0', 'Explanation': "Could not locate information on lobbying contracts or dues to lobbying information/grants to nonprofits."},
      'Public Records': {'Answer': '1', 'Explanation': "Comprehensive online portal."},
      'Taxes': {'Answer': '.5', 'Explanation': "Has assessment rolls and tax maps. No tax tables spelling out levy by town/school districts."},
    },
    'Allegany':
      {'Budget': {'Answer': '1', 'Explanation': "Easy link in dropdown menu on landing page. PDF versions of budgets dating back to 2010. No easy comparison."},
        'Meetings': {'Answer': '1', 'Explanation': "Has minutes and agendas for committees and board of legislators. Has full calendar available."},
        'Elected Officials': {'Answer': '1', 'Explanation': "Has contact info for electeds, does not show committee assignments."},
        'Administrative Officials': {'Answer': '1', 'Explanation': "Has departmental listings with contact info for department heads."},
        'Audits': {'Answer': '0', 'Explanation': "Did not find landing page or area for audits or financial statements."},
        'Contracts': {'Answer': '0', 'Explanation': ""},
        'Lobbying': {'Answer': '0', 'Explanation': ""},
        'Public Records': {'Answer': '.5', 'Explanation': 'I did not locate specific FOIL information. But there is a nice "Find Public Records" page that has a wealth of information.'},
        'Taxes': {'Answer': '1', 'Explanation': "There are PDF tables of town, county, village and school tax rates."},
      },
    'Bronx':
      {'Budget': {'Answer': '1', 'Explanation': "Bronx is part of the consolidated NYC government. Located budget on City Council website. Comprehensive information. Databases. Downloads."},
        'Meetings': {'Answer': '1', 'Explanation': "Very comprehensive site."},
        'Elected Officials': {'Answer': '1', 'Explanation': "Contact information for council members. Plus a page devoted to committees that outlines membership in each."},
        'Administrative Officials': {'Answer': '1', 'Explanation': "Found on website for Office of the Mayor."},
        'Audits': {'Answer': '1', 'Explanation': "Office of the NYC Comptroller."},
        'Contracts': {'Answer': '1', 'Explanation': "Departments have contract documents online. Plus, database available on NYC open data."},
        'Lobbying': {'Answer': '1', 'Explanation': "I did not specifically find anything related to Lobbying."},
        'Public Records': {'Answer': '1', 'Explanation': ""},
        'Taxes': {'Answer': '1', 'Explanation': ""},
      },
      'Broome':
        {'Budget': {'Answer': '1', 'Explanation': "PDF budget books going back to 2011. Only PDF, makes it difficult to compare year-over year."},
          'Meetings': {'Answer': '1', 'Explanation': "No video."},
          'Elected Officials': {'Answer': '1', 'Explanation': "Does not include committee assignments."},
          'Administrative Officials': {'Answer': '1', 'Explanation': ""},
          'Audits': {'Answer': '1', 'Explanation': "Financial audits from 2009-2015."},
          'Contracts': {'Answer': '0', 'Explanation': "Could not locate a dedicated area for this information."},
          'Lobbying': {'Answer': '0', 'Explanation': ""},
          'Public Records': {'Answer': '1', 'Explanation': ""},
          'Taxes': {'Answer': '1', 'Explanation': "Offers all other municipal tax rates plus area for online payment."},
        },
    'Cattaraugus':
      {'Budget': {'Answer': '1', 'Explanation': "Going back to 2012, although 2013 is missing. All PDF, not easy to compare trends."},
        'Meetings': {'Answer': '1', 'Explanation': ""},
        'Elected Officials': {'Answer': '1', 'Explanation': "Has landing page for committee assignments."},
        'Administrative Officials': {'Answer': '1', 'Explanation': "Downloadable PDF directory of town, village, county, state officials."},
        'Audits': {'Answer': '0', 'Explanation': "Did not locate."},
        'Contracts': {'Answer': '0', 'Explanation': "Did not locate."},
        'Lobbying': {'Answer': '0', 'Explanation': "Did not locate."},
        'Public Records': {'Answer': '1', 'Explanation': ""},
        'Taxes': {'Answer': '1', 'Explanation': "Bills, rates and rolls. Plus comparisons."},
      },
      'Cayuga':
        {'Budget': {'Answer': '1', 'Explanation': "Has opengov.com transparency site. Wonderful comparisons. Very nice site."},
          'Meetings': {'Answer': '1', 'Explanation': "Minutes dating back to 2004."},
          'Elected Officials': {'Answer': '1', 'Explanation': ""},
          'Administrative Officials': {'Answer': '1', 'Explanation': ""},
          'Audits': {'Answer': '1', 'Explanation': "Had to locate via search, but found basic financial statements/audits."},
          'Contracts': {'Answer': '0', 'Explanation': "Did not find dedicated portal for contracts."},
          'Lobbying': {'Answer': '0', 'Explanation': "Could not locate."},
          'Public Records': {'Answer': '1', 'Explanation': "A little difficult to find. But also offers a list of records held by county departments."},
          'Taxes': {'Answer': '1', 'Explanation': ""},
        },
        'Chautauqua':
          {'Budget': {'Answer': '1', 'Explanation': "PDF budgets only. Back to 2011."},
            'Meetings': {'Answer': '1', 'Explanation': "For all boards and commissions."},
            'Elected Officials': {'Answer': '1', 'Explanation': "Has committee assignments clearly noted."},
            'Administrative Officials': {'Answer': '1', 'Explanation': ""},
            'Audits': {'Answer': '1', 'Explanation': "Has annual financial statements."},
            'Contracts': {'Answer': '0', 'Explanation': "No landing page with contract documents."},
            'Lobbying': {'Answer': '0', 'Explanation': ""},
            'Public Records': {'Answer': '1', 'Explanation': ""},
            'Taxes': {'Answer': '1', 'Explanation': "Lookup by address. Plus rolls and bills. Tax table also."},
          },
    'Chemung':
      {'Budget': {'Answer': '1', 'Explanation': "Budget and budget presentation slides for some years. Budgets dating back to 2007. PDF formats"},
        'Meetings': {'Answer': '1', 'Explanation': "Nicely collected agendas and minutes"},
        'Elected Officials': {'Answer': '1', 'Explanation': "Downloadable directory of county, town, city and village officials."},
        'Administrative Officials': {'Answer': '1', 'Explanation': "Department pages w/dept head information"},
        'Audits': {'Answer': '1', 'Explanation': "Audited financial statements "},
        'Contracts': {'Answer': '0', 'Explanation': "Audited financial statements"},
        'Lobbying': {'Answer': '0', 'Explanation': ""},
        'Public Records': {'Answer': '1', 'Explanation': ""},
        'Taxes': {'Answer': '.5', 'Explanation': "Includes GIS mapping, could not find tax tables. You can look up each parcel to find tax information."},
      },
      'Chenango':
        {'Budget': {'Answer': '0', 'Explanation': "I could not find prior year budgets. 2016 budget linked on home page, pdf format."},
          'Meetings': {'Answer': '1', 'Explanation': "Board of Supervisors schedule/minutes posted as well as committee meeting schedule. "},
          'Elected Officials': {'Answer': '1', 'Explanation': "Directory of elected supervisors, members of board of supervisors with home and cell numbers, emails."},
          'Administrative Officials': {'Answer': '.5', 'Explanation': "Department pages w/dept head informationAudited financial statements "},
          'Audits': {'Answer': '0', 'Explanation': "Has annual financial statements."},
          'Contracts': {'Answer': '0', 'Explanation': "Audited financial statements"},
          'Lobbying': {'Answer': '0', 'Explanation': ""},
          'Public Records': {'Answer': '0', 'Explanation': ""},
          'Taxes': {'Answer': '.5', 'Explanation': "Tax rolls available for town, village, school district. Did not find specific tax tables. "},
        },
        'Clinton':
          {'Budget': {'Answer': '1', 'Explanation': "This website is very busy. Budget not on home page, had to navigate to Legislative Office page. Could not find prior year financial plans."},
            'Meetings': {'Answer': '.5', 'Explanation': "There is a home page link to a calendar of events. Minutes are available."},
            'Elected Officials': {'Answer': '1', 'Explanation': ""},
            'Administrative Officials': {'Answer': '1', 'Explanation': ""},
            'Audits': {'Answer': '0', 'Explanation': ""},
            'Contracts': {'Answer': '.5', 'Explanation': 'There is some information about contracts included in the "resolutions" information for the Legislature. Summaries of the contracts the legislators act upon.'},
            'Lobbying': {'Answer': '0', 'Explanation': ""},
            'Public Records': {'Answer': '1', 'Explanation': ""},
            'Taxes': {'Answer': '1', 'Explanation': "Nice tables of tax rates, going back to 1978 for the county, to 2007 for the county village rates."},
          },
      'Delaware':
        {'Budget': {'Answer': '1', 'Explanation': "Yes, but only by using Search engine. Budgets back 2008-2016, as image PDF."},
          'Meetings': {'Answer': '1', 'Explanation': "Meetings and Minutes available by using search engine. No direct link on Landing page."},
          'Elected Officials': {'Answer': '1', 'Explanation': "Yes, through tab menu."},
          'Administrative Officials': {'Answer': '1', 'Explanation': "Under government."},
          'Audits': {'Answer': '0', 'Explanation': "Shows payment for audits in minutes, not audit documents themselves."},
          'Contracts': {'Answer': '0', 'Explanation': ""},
          'Lobbying': {'Answer': '0', 'Explanation': ""},
          'Public Records': {'Answer': '0', 'Explanation': "FOIL form only available through Search engine."},
          'Taxes': {'Answer': '1', 'Explanation': "Yes, by searching through Real Property Tax Services."},
        },
        'Dutchess':
          {'Budget': {'Answer': '1', 'Explanation': "2012-2017 available."},
            'Meetings': {'Answer': '.5', 'Explanation': "Through calendar."},
            'Elected Officials': {'Answer': '1', 'Explanation': ""},
            'Administrative Officials': {'Answer': '1', 'Explanation': ""},
            'Audits': {'Answer': '1', 'Explanation': ""},
            'Contracts': {'Answer': '1', 'Explanation': "Quick Link on home page."},
            'Lobbying': {'Answer': '0', 'Explanation': ""},
            'Public Records': {'Answer': '1', 'Explanation': ""},
            'Taxes': {'Answer': '.5', 'Explanation': "School, Village and City Tax Rolls 2013-2017."},
          },
      'Erie':
        {'Budget': {'Answer': '1', 'Explanation': "2005-2017 but as PDF."},
          'Meetings': {'Answer': '1', 'Explanation': "Session Schedule and Previous sessions agendas and meetings, as PDF files."},
          'Elected Officials': {'Answer': '1', 'Explanation': ""},
          'Administrative Officials': {'Answer': '1', 'Explanation': ""},
          'Audits': {'Answer': '1', 'Explanation': "PDF Files, stops in 2015. Not updated?"},
          'Contracts': {'Answer': '1', 'Explanation': ""},
          'Lobbying': {'Answer': '.5', 'Explanation': "Appears to show lobbying efforts in County Legislative Minutes."},
          'Public Records': {'Answer': '1', 'Explanation': ""},
          'Taxes': {'Answer': '1', 'Explanation': ""},
        },
      'Essex':
        {'Budget': {'Answer': '1', 'Explanation': "2006-2017 under County Treasurer Link."},
          'Meetings': {'Answer': '.5', 'Explanation': "No upcoming agendas posted, Searchable Minutes back to 2005."},
          'Elected Officials': {'Answer': '1', 'Explanation': "Government Center Links."},
          'Administrative Officials': {'Answer': '1', 'Explanation': ""},
          'Audits': {'Answer': '0', 'Explanation': ""},
          'Contracts': {'Answer': '1', 'Explanation': "Under Bids/RFPs."},
          'Lobbying': {'Answer': '0', 'Explanation': ""},
          'Public Records': {'Answer': '0', 'Explanation': "FOIL not presented."},
          'Taxes': {'Answer': '1', 'Explanation': "Property Tax Lookup."},
        },
    'Niagara':
      {'Budget': {'Answer': '1', 'Explanation': ""},
        'Meetings': {'Answer': '.5', 'Explanation': "Agendas go back to 2003, but minutes only posted as of 2017."},
        'Elected Officials': {'Answer': '.5', 'Explanation': "Difficult to find."},
        'Administrative Officials': {'Answer': '1', 'Explanation': ""},
        'Audits': {'Answer': '0', 'Explanation': ""},
        'Contracts': {'Answer': '0', 'Explanation': ""},
        'Lobbying': {'Answer': '0', 'Explanation': ""},
        'Public Records': {'Answer': '1', 'Explanation': "Including FOIL."},
        'Taxes': {'Answer': '1', 'Explanation': "Plus historical data."},
      },
      'Oneida':
        {'Budget': {'Answer': '1', 'Explanation': ""},
          'Meetings': {'Answer': '1', 'Explanation': ""},
          'Elected Officials': {'Answer': '1', 'Explanation': ""},
          'Administrative Officials': {'Answer': '1', 'Explanation': ""},
          'Audits': {'Answer': '1', 'Explanation': ""},
          'Contracts': {'Answer': '0', 'Explanation': ""},
          'Lobbying': {'Answer': '0', 'Explanation': ""},
          'Public Records': {'Answer': '1', 'Explanation': ""},
          'Taxes': {'Answer': '.5', 'Explanation': ""},
        },
      'Onondaga':
        {'Budget': {'Answer': '1', 'Explanation': ""},
          'Meetings': {'Answer': '.5', 'Explanation': ""},
          'Elected Officials': {'Answer': '1', 'Explanation': ""},
          'Administrative Officials': {'Answer': '0', 'Explanation': ""},
          'Audits': {'Answer': '1', 'Explanation': ""},
          'Contracts': {'Answer': '0', 'Explanation': ""},
          'Lobbying': {'Answer': '0', 'Explanation': ""},
          'Public Records': {'Answer': '1', 'Explanation': ""},
          'Taxes': {'Answer': '.5', 'Explanation': ""},
        },
        'Ontario':
          {'Budget': {'Answer': '1', 'Explanation': 'I could not find the budget in any specific tab or section, but once I typed "budget" into the search bar it was easily accessible.'},
            'Meetings': {'Answer': '.5', 'Explanation': 'Found agenda, but could not find recording. Again, these were found by typing into the search bar "meetings." Could not easily find them under any section.'},
            'Elected Officials': {'Answer': '1', 'Explanation': ""},
            'Administrative Officials': {'Answer': '1', 'Explanation': ""},
            'Audits': {'Answer': '1', 'Explanation': "Again, not found easily under subsection or tab, but easily searchable on the site."},
            'Contracts': {'Answer': '0', 'Explanation': "Cannot find."},
            'Lobbying': {'Answer': '.5', 'Explanation': ""},
            'Public Records': {'Answer': '1', 'Explanation': ""},
            'Taxes': {'Answer': '.5', 'Explanation': ""},
          },
          'Orange':
            {'Budget': {'Answer': '1', 'Explanation': ""},
              'Meetings': {'Answer': '.5', 'Explanation': "Cannot easily find any sort of recording of the meetings."},
              'Elected Officials': {'Answer': '1', 'Explanation': ""},
              'Administrative Officials': {'Answer': '1', 'Explanation': ""},
              'Audits': {'Answer': '0', 'Explanation': "Cannot find."},
              'Contracts': {'Answer': '0', 'Explanation': "Cannot find."},
              'Lobbying': {'Answer': '0', 'Explanation': "Cannot find."},
              'Public Records': {'Answer': '1', 'Explanation': ""},
              'Taxes': {'Answer': '.5', 'Explanation': ""},
            },
        'Orleans':
          {'Budget': {'Answer': '1', 'Explanation': ""},
            'Meetings': {'Answer': '1', 'Explanation': ""},
            'Elected Officials': {'Answer': '.5', 'Explanation': "I could not find conflict of interest statements; however a map of each legislator's districts was placed with the contact info. Nice touch."},
            'Administrative Officials': {'Answer': '1', 'Explanation': ""},
            'Audits': {'Answer': '0', 'Explanation': "I could not find any on the county website."},
            'Contracts': {'Answer': '0', 'Explanation': "I could not find a repository of contracts."},
            'Lobbying': {'Answer': '0', 'Explanation': "I could not find any information about lobbying."},
            'Public Records': {'Answer': '.5', 'Explanation': "There appears to be no central web page re: FOIL. There is a page describing the county records access officer and PDF of a FOIL request form for the health department."},
            'Taxes': {'Answer': '.5', 'Explanation': "Annual assessment rolls and tax rates are published."},
          },
          'Otsego':
            {'Budget': {'Answer': '1', 'Explanation': "Easy to find on the home page."},
              'Meetings': {'Answer': '1', 'Explanation': "Easy to find under the 'legislature' tab."},
              'Elected Officials': {'Answer': '1', 'Explanation': "Easy to find under the 'legislature' tab, and there's also a government directory."},
              'Administrative Officials': {'Answer': '0', 'Explanation': "No clear list of administrative officials."},
              'Audits': {'Answer': '0', 'Explanation': "There's a page for the county auditor but nothing on past audits."},
              'Contracts': {'Answer': '0', 'Explanation': "There's a mention of contracts under the county attorney page but no information on contracts."},
              'Lobbying': {'Answer': '0', 'Explanation': "Couldn't find any mention of lobbying."},
              'Public Records': {'Answer': '.5', 'Explanation': "County offers 'vital records' under the Office of the County Clerk webpage, but you have to create an account on a website to access it. Also, there doesn't appear to be any information on how to file a public records request."},
              'Taxes': {'Answer': '.5', 'Explanation': "A 'tax rate chart' and 'tax sale final list' are available under the Otsego County Real Property Tax Service, but there's no explanation as to how county tax levels are set."},
            },
          'Oswego':
            {'Budget': {'Answer': '.5', 'Explanation': "Prior budgets could be found by using a Google search; I did not find links to prior budgets on the site."},
              'Meetings': {'Answer': '1', 'Explanation': "Minutes of committee meetings included; many years of prior meetings' minutes."},
              'Elected Officials': {'Answer': '.5', 'Explanation': "I could not find any conflict of interest statements."},
              'Administrative Officials': {'Answer': '1', 'Explanation': ""},
              'Audits': {'Answer': '.5', 'Explanation': "I could find no central repository of audits. Through a Google site-search, I was able to find some audits."},
              'Contracts': {'Answer': '0', 'Explanation': ""},
              'Lobbying': {'Answer': '0', 'Explanation': ""},
              'Public Records': {'Answer': '1', 'Explanation': ""},
              'Taxes': {'Answer': '.5', 'Explanation': "I found info on property tax rates and tax rolls; could not find info about county sales tax."},
            },
            'Putnam':
              {'Budget': {'Answer': '1', 'Explanation': "Available under the county's finance page."},
                'Meetings': {'Answer': '.5', 'Explanation': "There's a working legislative calendar, but the option to 'view the latest full legislative meetings' results in an error code. And the minutes are only as recent as 2014. "},
                'Elected Officials': {'Answer': '1', 'Explanation': "Easy to find information under the 'officials' tab."},
                'Administrative Officials': {'Answer': '0', 'Explanation': "No information specifically on administrative officials."},
                'Audits': {'Answer': '0', 'Explanation': "No audit information is available on the county's finance page."},
                'Contracts': {'Answer': '1', 'Explanation': "An alphabetized list of contracts is available on its own page, entitled county contracts."},
                'Lobbying': {'Answer': '0', 'Explanation': "No information about lobbying appears to be available."},
                'Public Records': {'Answer': '.5', 'Explanation': "You can look up records through another website the county links to, and the 'F.O.I.L. Officer' page has plenty of information on filing records requests."},
                'Taxes': {'Answer': '.5', 'Explanation': "In past years, there have been articles about 'where your tax dollar goes' paired with that year's budget. This year, though, there's nothing like that yet. And there's information about tax rates under the Real Property Tax Service Agency page but it's often not up-to-date."},
              },
        'Rensselaer':
          {'Budget': {'Answer': '1', 'Explanation': "The budgets are all on the website, but they are not under the budget tab. They are under the executive's office tab and I had to search for a few minutes before I could locate them."},
            'Meetings': {'Answer': '1', 'Explanation': ""},
            'Elected Officials': {'Answer': '1', 'Explanation': ""},
            'Administrative Officials': {'Answer': '1', 'Explanation': ""},
            'Audits': {'Answer': '.5', 'Explanation': "This information can be located under the Bureau of Finance tab."},
            'Contracts': {'Answer': '0', 'Explanation': "I could not locate contract information. There is a purchasing department tab and a county bid information tab, but I couldn't find any contracts with vendors."},
            'Lobbying': {'Answer': '0', 'Explanation': "I could not locate any lobbying information on the county website."},
            'Public Records': {'Answer': '.5', 'Explanation': "If you visit individual website sections -- for instance, the county attorney section -- there are FOIL directions."},
            'Taxes': {'Answer': '1', 'Explanation': ""},
          },
          'Rensselaer':
            {'Budget': {'Answer': '1', 'Explanation': "The budgets are all on the website, but they are not under the budget tab. They are under the executive's office tab and I had to search for a few minutes before I could locate them."},
              'Meetings': {'Answer': '1', 'Explanation': ""},
              'Elected Officials': {'Answer': '1', 'Explanation': ""},
              'Administrative Officials': {'Answer': '1', 'Explanation': ""},
              'Audits': {'Answer': '1', 'Explanation': "This information can be located under the Bureau of Finance tab."},
              'Contracts': {'Answer': '0', 'Explanation': "I could not locate contract information. There is a purchasing department tab and a county bid information tab, but I couldn't find any contracts with vendors."},
              'Lobbying': {'Answer': '0', 'Explanation': "I could not locate any lobbying information on the county website."},
              'Public Records': {'Answer': '.5', 'Explanation': "If you visit individual website sections -- for instance, the county attorney section -- there are FOIL directions."},
              'Taxes': {'Answer': '1', 'Explanation': ""},
            },
      'Richmond':
        {'Budget': {'Answer': '0', 'Explanation': ""},
          'Meetings': {'Answer': '0', 'Explanation': ""},
          'Elected Officials': {'Answer': '0', 'Explanation': ""},
          'Administrative Officials': {'Answer': '0', 'Explanation': ""},
          'Audits': {'Answer': '0', 'Explanation': ""},
          'Contracts': {'Answer': '0', 'Explanation': ""},
          'Lobbying': {'Answer': '0', 'Explanation': ""},
          'Public Records': {'Answer': '0', 'Explanation': ""},
          'Taxes': {'Answer': '0', 'Explanation': ""},
        },
      'Rockland':
        {'Budget': {'Answer': '1', 'Explanation': ""},
          'Meetings': {'Answer': '1', 'Explanation': ""},
          'Elected Officials': {'Answer': '1', 'Explanation': ""},
          'Administrative Officials': {'Answer': '1', 'Explanation': ""},
          'Audits': {'Answer': '0', 'Explanation': ""},
          'Contracts': {'Answer': '0', 'Explanation': ""},
          'Lobbying': {'Answer': '0', 'Explanation': ""},
          'Public Records': {'Answer': '1', 'Explanation': ""},
          'Taxes': {'Answer': '1', 'Explanation': ""},
        },
        'Saratoga':
          {'Budget': {'Answer': '1', 'Explanation': ""},
            'Meetings': {'Answer': '1', 'Explanation': ""},
            'Elected Officials': {'Answer': '1', 'Explanation': ""},
            'Administrative Officials': {'Answer': '1', 'Explanation': ""},
            'Audits': {'Answer': '1', 'Explanation': ""},
            'Contracts': {'Answer': '0', 'Explanation': ""},
            'Lobbying': {'Answer': '0', 'Explanation': ""},
            'Public Records': {'Answer': '1', 'Explanation': ""},
            'Taxes': {'Answer': '1', 'Explanation': ""},
          },
          'Schenectady':
            {'Budget': {'Answer': '1', 'Explanation': ""},
              'Meetings': {'Answer': '.5', 'Explanation': "Minutes are not available (or perhaps not easily located). Locating page with agenda for legislature meetings is not easy to find."},
              'Elected Officials': {'Answer': '1', 'Explanation': ""},
              'Administrative Officials': {'Answer': '1', 'Explanation': ""},
              'Audits': {'Answer': '0', 'Explanation': ""},
              'Contracts': {'Answer': '0', 'Explanation': ""},
              'Lobbying': {'Answer': '0', 'Explanation': ""},
              'Public Records': {'Answer': '.5', 'Explanation': 'No basic FOIL page but several "Information request" pages.'},
              'Taxes': {'Answer': '.5', 'Explanation': "Equalization rates and ratio pages but not able to find sales tax or other info."},
            },
            'Schoharie':
              {'Budget': {'Answer': '1', 'Explanation': "PDF of scanned papers."},
                'Meetings': {'Answer': '.5', 'Explanation': "I found some documents posted as PDFs, but unable to locate a central site with any dates, agendas. No minutes I was able to locate."},
                'Elected Officials': {'Answer': '.5', 'Explanation': "PDF form of county and local officials. No emails/bio data. A form to submit to get in touch with certain departments is available."},
                'Administrative Officials': {'Answer': '.5', 'Explanation': ""},
                'Audits': {'Answer': '0', 'Explanation': "Unable to locate. No apparent search functionality on page. Website also links you to outside sites for departments."},
                'Contracts': {'Answer': '0', 'Explanation': "No set area for contracts that I'm able to find."},
                'Lobbying': {'Answer': '0', 'Explanation': "Does not appear to be a centralized site for this data."},
                'Public Records': {'Answer': '.5', 'Explanation': "There is an entire section of public documents that is searchable. There is not, that is easy to locate, a form for FOIl submission."},
                'Taxes': {'Answer': '.5', 'Explanation': "A tax information page includes a link to assessment rolls and a contact page, but difficult to navigate to find valuation info (which is touched on in budget). Unable to locate sales and other tax data."},
              },
              'Schuyler':
                {'Budget': {'Answer': '1', 'Explanation': "Links to budgets and presentations."},
                  'Meetings': {'Answer': '1', 'Explanation': "An agenda center links out to agendas and minutes."},
                  'Elected Officials': {'Answer': '1', 'Explanation': ""},
                  'Administrative Officials': {'Answer': '1', 'Explanation': "A list of department and staff that is clickable."},
                  'Audits': {'Answer': '1', 'Explanation': "Page links to PDFs of financial audits."},
                  'Contracts': {'Answer': '.5', 'Explanation': "By googling, located several BID documents but not able to find approved, active contracts or centralized page."},
                  'Lobbying': {'Answer': '0', 'Explanation': ""},
                  'Public Records': {'Answer': '1', 'Explanation': "A records page, online FOIL forms which I located through search but didn't have a button that I saw on main page."},
                  'Taxes': {'Answer': '1', 'Explanation': "Info on town tax rolles, etc. didn't find dedicated section for sales tax, etc."},
                },
          'Seneca':
            {'Budget': {'Answer': '1', 'Explanation': "There was some explanation in the budget document"},
              'Meetings': {'Answer': '1', 'Explanation': ""},
              'Elected Officials': {'Answer': '1', 'Explanation': ""},
              'Administrative Officials': {'Answer': '1', 'Explanation': ""},
              'Audits': {'Answer': '0', 'Explanation': ""},
              'Contracts': {'Answer': '0', 'Explanation': ""},
              'Lobbying': {'Answer': '0', 'Explanation': ""},
              'Public Records': {'Answer': '1', 'Explanation': ""},
              'Taxes': {'Answer': '.5', 'Explanation': ""},
            },
            'St. Lawrence':
              {'Budget': {'Answer': '0', 'Explanation': ""},
                'Meetings': {'Answer': '1', 'Explanation': ""},
                'Elected Officials': {'Answer': '1', 'Explanation': ""},
                'Administrative Officials': {'Answer': '1', 'Explanation': ""},
                'Audits': {'Answer': '.5', 'Explanation': ""},
                'Contracts': {'Answer': '0', 'Explanation': ""},
                'Lobbying': {'Answer': '0', 'Explanation': ""},
                'Public Records': {'Answer': '0', 'Explanation': ""},
                'Taxes': {'Answer': '1', 'Explanation': ""},
              },
          'Steuben':
            {'Budget': {'Answer': '1', 'Explanation': ""},
              'Meetings': {'Answer': '1', 'Explanation': ""},
              'Elected Officials': {'Answer': '.5', 'Explanation': ""},
              'Administrative Officials': {'Answer': '1', 'Explanation': ""},
              'Audits': {'Answer': '1', 'Explanation': ""},
              'Contracts': {'Answer': '0', 'Explanation': ""},
              'Lobbying': {'Answer': '0', 'Explanation': ""},
              'Public Records': {'Answer': '1', 'Explanation': ""},
              'Taxes': {'Answer': '1', 'Explanation': ""},
            },
          'Suffolk':
            {'Budget': {'Answer': '0', 'Explanation': "Not easy to find. Had to click on the county Legislature page. Was no budget department."},
              'Meetings': {'Answer': '1', 'Explanation': ""},
              'Elected Officials': {'Answer': '1', 'Explanation': ""},
              'Administrative Officials': {'Answer': '1', 'Explanation': ""},
              'Audits': {'Answer': '0', 'Explanation': ""},
              'Contracts': {'Answer': '0', 'Explanation': ""},
              'Lobbying': {'Answer': '0', 'Explanation': ""},
              'Public Records': {'Answer': '1', 'Explanation': ""},
              'Taxes': {'Answer': '1', 'Explanation': ""},
            },
    'Sullivan':
      {'Budget': {'Answer': '1', 'Explanation': 'Links on welcome page to current and past budgets.'},
        'Meetings': {'Answer': '1', 'Explanation': 'Legislature link on welcome page leads to page that lists meetings and agendas.'},
        'Elected Officials': {'Answer': '1', 'Explanation': 'Listed under Departments and Legislature on welcome page.'},
        'Administrative Officials': {'Answer': '1', 'Explanation': 'Listed under Departments with additional info in County Director on welcome page.'},
        'Audits': {'Answer': '.5', 'Explanation': "Had to search site for 'audits' to find the page, which listed two audits, the last one in 2013 for the 2012 fiscal year. Department of Audit and Control link under 'Departments' listed no reports or audits."},
        'Contracts': {'Answer': '.5', 'Explanation': 'Rules for procuring contracts are included on the site, although it takes a few clicks to find it. However, could not find listing of RFPs or contracts other than a few from press releases.'},
        'Lobbying': {'Answer': '0', 'Explanation': "Could not find any lobbying data or info on the site. Site searches for 'lobbying' and 'lobbyists' yielded no results."},
        'Public Records': {'Answer': '.5', 'Explanation': "FOIL requests forms are available on the site, but I could only find them by searching 'FOIL.' The page does list the records officer with contact info. I could not find additional information on state FOIL or Open Meetings Law to assist residents."},
        'Taxes': {'Answer': '.5', 'Explanation': "There is partial information, including tax rates, etc., from the proposed budget. I navigated to the Management & Budget link under 'Departments' and found a link to a power point presentation from 2014 or 2015 that provides limited explanation of the tax rate and the tax cap."},
      },
      'Tioga':
        {'Budget': {'Answer': '1', 'Explanation': "Budget listed under 'Treasurer' in departments listing."},
          'Meetings': {'Answer': '1', 'Explanation': "Searchable database on welcome page with complete listing of meetings and agendas."},
          'Elected Officials': {'Answer': '1', 'Explanation': "'Government' link on welcome page includes complete listing of elected officials with contact info."},
          'Administrative Officials': {'Answer': '1', 'Explanation': "'Government' link on welcome page includes complete listing of department heads and administrators with contact info."},
          'Audits': {'Answer': '1', 'Explanation': "Document Library' link on welcome page takes readers to a searchable database that lists everything from local laws, to meeting agendas, to audits and financial reports."},
          'Contracts': {'Answer': '1', 'Explanation': "Welcome page includes a 'Bids & RFP' and a 'Legal Notices' listing."},
          'Lobbying': {'Answer': '0', 'Explanation': "Could not find a listing of lobbyist. A site search for 'lobbying' and 'lobbyists' yielded no results."},
          'Public Records': {'Answer': '1', 'Explanation': "Very FOIL friendly site. There is a 'FOIL' link atop the welcome page and a link to a FOIL request and data under the drop-down 'Government' link on the welcome page. The FOIL page provides a request form, links to pertinent sites and includes a links to frequently requested documents."},
          'Taxes': {'Answer': '1', 'Explanation': "Tons of data on the county site. 'Real Property & Assessment Rolls' link under 'Departments' has tons of links to tax, assessment and budget databases, most with info from multiple years. Assessment Roll also listed under 'Serves' drop-down menu on welcome page."},
        },
        'Tompkins':
          {'Budget': {'Answer': '1', 'Explanation': "Budget and financial info listed under 'Popular Links' on welcome page."},
            'Meetings': {'Answer': '1', 'Explanation': "'Meetings and Agendas' tab on welcome page."},
            'Elected Officials': {'Answer': '1', 'Explanation': "Names and contact info for elected officials is available, but does require some navigation to find."},
            'Administrative Officials': {'Answer': '1', 'Explanation': "Most of the names and contact info is listed under 'Departments' on the welcome page. In some cases it requires a few extra clicks to find."},
            'Audits': {'Answer': '.5', 'Explanation': "There is a 'Recent Reports' link under 'Popular Links,' and financial reports and grants data on a menu on that page."},
            'Contracts': {'Answer': '.5', 'Explanation': "Most info on RFPs and submitted bids is on the site, but it is a bit hard to find at first. It's under 'Purchasing' in the departments listing, and there does not appear to be a full listing of contracts."},
            'Lobbying': {'Answer': '0', 'Explanation': ""},
            'Public Records': {'Answer': '1', 'Explanation': "FOIL form, link to state law and concise county guidelines for providing public records are easily found under the 'FOIL' link atop the welcome page."},
            'Taxes': {'Answer': '1', 'Explanation': "Relatively good info on taxes, and even includes an explainer on how taxes are determined. But, again, it takes some navigating. FAQ on taxes is very good, but I could only find it by searching 'taxes' in search function."},
          },
        'Ulster':
          {'Budget': {'Answer': '1', 'Explanation': ""},
            'Meetings': {'Answer': '.5', 'Explanation': "Agendas and minutes are available for county board meetings. And while there is a link to monthly meeting calendars for committees and other boards, there are no agendas or minutes for those meetings."},
            'Elected Officials': {'Answer': '1', 'Explanation': "But conflict of interest statements were not available."},
            'Administrative Officials': {'Answer': '1', 'Explanation': ""},
            'Audits': {'Answer': '0', 'Explanation': "Five years of the annual financial reports compiled by the county Department of Finance are available on the website but there are no links to any audits by independent agencies."},
            'Contracts': {'Answer': '.5', 'Explanation': "A listing of the county's contracts is available, but with no explanation of what the contract is for or who bid for the contract."},
            'Lobbying': {'Answer': '0', 'Explanation': ""},
            'Public Records': {'Answer': '1', 'Explanation': ""},
            'Taxes': {'Answer': '0', 'Explanation': ""},
          },
        'Warren':
          {'Budget': {'Answer': '1', 'Explanation': ""},
            'Meetings': {'Answer': '1', 'Explanation': ""},
            'Elected Officials': {'Answer': '1', 'Explanation': "You have to search a bit to find committee assignments and there is no information about conflicts of interests."},
            'Administrative Officials': {'Answer': '1', 'Explanation': ""},
            'Audits': {'Answer': '1', 'Explanation': ""},
            'Contracts': {'Answer': '0', 'Explanation': ""},
            'Lobbying': {'Answer': '0', 'Explanation': ""},
            'Public Records': {'Answer': '0', 'Explanation': "There is a link to FOIL requests on the home page, but it simply takes you to the Contact Warren County page. There is no link to who handles FOIL requests for each department."},
            'Taxes': {'Answer': '0', 'Explanation': ""},
          },
        'Washington':
          {'Budget': {'Answer': '1', 'Explanation': ""},
            'Meetings': {'Answer': '1', 'Explanation': ""},
            'Elected Officials': {'Answer': '1', 'Explanation': "No conflict of interest statements are included."},
            'Administrative Officials': {'Answer': '1', 'Explanation': ""},
            'Audits': {'Answer': '0', 'Explanation': ""},
            'Contracts': {'Answer': '0', 'Explanation': ""},
            'Lobbying': {'Answer': '0', 'Explanation': ""},
            'Public Records': {'Answer': '0', 'Explanation': ""},
            'Taxes': {'Answer': '1', 'Explanation': ""},
          },
          'Wayne':
            {'Budget': {'Answer': '1', 'Explanation': "Budget details contained in minutes of monthly meetings."},
              'Meetings': {'Answer': '1', 'Explanation': "There are online links to meetings with minutes from previous meetings."},
              'Elected Officials': {'Answer': '1', 'Explanation': "Phone numbers and emails online, with links to committees."},
              'Administrative Officials': {'Answer': '1', 'Explanation': ""},
              'Audits': {'Answer': '1', 'Explanation': "Pretty extensive listing of audits for each county agency."},
              'Contracts': {'Answer': '0', 'Explanation': "Hard to find"},
              'Lobbying': {'Answer': '0', 'Explanation': ""},
              'Public Records': {'Answer': '1', 'Explanation': ""},
              'Taxes': {'Answer': '1', 'Explanation': "Assessments listed by town with recent figures"},
            },
          'Westchester':
            {'Budget': {'Answer': '1', 'Explanation': "Westchester County site has a pdf of the current budget, with comparisons to previous years."},
              'Meetings': {'Answer': '1', 'Explanation': "The website for county legislators has a comprehensive listing of all legislative meetings with video of past meetings. "},
              'Elected Officials': {'Answer': '1', 'Explanation': "Phone numbers, emails for elected officials online."},
              'Administrative Officials': {'Answer': '1', 'Explanation': ""},
              'Audits': {'Answer': '.5', 'Explanation': "Found audits for the Industrial Development Agency but not for all."},
              'Contracts': {'Answer': '1', 'Explanation': ""},
              'Lobbying': {'Answer': '.5', 'Explanation': ""},
              'Public Records': {'Answer': '1', 'Explanation': "Comprehensive Freedom of Information Law request form that links to agencies."},
              'Taxes': {'Answer': '1', 'Explanation': "Good links to how county and state taxes are calculated."},
            },
          'Wyoming':
            {'Budget': {'Answer': '1', 'Explanation': ""},
              'Meetings': {'Answer': '1', 'Explanation': ""},
              'Elected Officials': {'Answer': '1', 'Explanation': ""},
              'Administrative Officials': {'Answer': '1', 'Explanation': ""},
              'Audits': {'Answer': '1', 'Explanation': ""},
              'Contracts': {'Answer': '1', 'Explanation': ""},
              'Lobbying': {'Answer': '0', 'Explanation': ""},
              'Public Records': {'Answer': '0', 'Explanation': ""},
              'Taxes': {'Answer': '1', 'Explanation': ""},
            },
            'Yates':
              {'Budget': {'Answer': '1', 'Explanation': ""},
                'Meetings': {'Answer': '1', 'Explanation': ""},
                'Elected Officials': {'Answer': '1', 'Explanation': ""},
                'Administrative Officials': {'Answer': '1', 'Explanation': ""},
                'Audits': {'Answer': '0', 'Explanation': ""},
                'Contracts': {'Answer': '0', 'Explanation': ""},
                'Lobbying': {'Answer': '0', 'Explanation': ""},
                'Public Records': {'Answer': '0', 'Explanation': ""},
                'Taxes': {'Answer': '1', 'Explanation': ""},
              }
};
