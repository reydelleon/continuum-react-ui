/**
 * @module      app
 * @author      Reydel Leon Machado
 * @copyright   (c) 2015 Reydel Leon Machado
 * @license     Licensed under MIT license
 */

var FilterableBuildTable = React.createClass({
    getInitialState: function () {
        return {
            searchTerm: ''
        }
    },
    handleUserInput: function (searchTerm) {
        this.setState({
            searchTerm: searchTerm
        });
    },
    render: function () {
        return (
                <div id="filterable-build-table">
                    <SearchBox
                            searchTerm={this.state.searchTerm}
                            onUserInput={this.handleUserInput}
                            />
                    <LatestBuildsTable
                            builds={this.props.builds}
                            searchTerm={this.state.searchTerm}/>
                </div>
        );
    }
});

var SearchBox = React.createClass({
    handleChange: function () {
        this.props.onUserInput(
                this.refs.searchTermInput.getDOMNode().value
        );
    },
    render: function () {
        return (
                <form>
                    <input
                            type="text"
                            placeholder="Search..."
                            value={this.props.searchTerm}
                            ref="searchTermInput"
                            onChange={this.handleChange}
                            />
                </form>
        );
    }
});

var LatestBuildsTable = React.createClass({
    render: function () {
        var rows = [];
        this.props.builds.forEach(function (build) {
            if (build.projectName.indexOf(this.props.searchTerm) === -1) {
                return;
            }
            
            rows.push(<BuildRow build={build}/>);
        }.bind(this));

        return (
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Build #</th>
                        <th>Project Name</th>
                        <th>Git Commit</th>
                        <th>Status</th>
                        <th>Duration [hh:mm:ss]</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
        );
    }
});

var BuildRow = React.createClass({
    render: function () {
        return (
                <tr>
                    <th scope="row">{this.props.build.id}</th>
                    <th>{this.props.build.projectName}</th>
                    <th>{this.props.build.gitCommit}</th>
                    <th>{this.props.build.status}</th>
                    <th>{this.props.build.duration}</th>
                </tr>
        );
    }
});

var builds = [
    { id: 1, projectName: "Space X", gitCommit: "2827771e1e12", status: "In Progress", duration: "00:00:32" },
    { id: 2, projectName: "Continuum", gitCommit: "2827771e1e12", status: "Failed", duration: "00:00:32" },
    { id: 3, projectName: "Space X", gitCommit: "2827771e1e12", status: "Completed", duration: "00:00:32" },
    { id: 4, projectName: "Craft", gitCommit: "2827771e1e12", status: "Completed", duration: "00:00:32" },
    { id: 5, projectName: "mentor", gitCommit: "2827771e1e12", status: "Failed", duration: "00:00:32" },
    { id: 6, projectName: "Xoom", gitCommit: "2827771e1e12", status: "Completed", duration: "00:00:32" },
    { id: 7, projectName: "Bridge", gitCommit: "2827771e1e12", status: "Failed", duration: "00:00:32" },
    { id: 8, projectName: "Futoba", gitCommit: "2827771e1e12", status: "Completed", duration: "00:00:32" },
    { id: 9, projectName: "Babayaga", gitCommit: "2827771e1e12", status: "Completed", duration: "00:00:32" }
];

React.render(<FilterableBuildTable builds={builds}/>, document.getElementById('latest-builds-table-container'));