// From http://yonaba.github.io/2012/08/14/List-your-GitHub-projects-using-JavaScript-and-jQuery.md.html
jQuery.githubUser = function(username, callback) {
    jQuery.getJSON('https://api.github.com/users/' + username + '/repos?callback=?', callback)
}

jQuery.fn.loadRepositories = function(username) {
    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data;
        var comparator = function(a, b) {
            return new Date(b.pushed_at) - new Date(a.pushed_at);
        };
        repos.sort(comparator);

        var list = $('<ul class="style1"/>');
        target.empty().append(list);
        $(repos).each(function() {
            if (this.name != (username.toLowerCase() + '.github.com')) {
                // Convert to a date string for localization or whatever. Plus I really don't want to make an array of
                // months
                var date = formatDate(new Date(this.pushed_at));
                var repoLink = (this.homepage) ? this.homepage : this.html_url;
                var name = this.name;
                var description = this.description;
                var language = this.language;
                list.append('<li class="first hidden">'
                            + '<p class="date">' + date + '</p>'
                            + '<h3><a href="' + repoLink + '">' + name + '</a></h3>'
                            + '<p>' + description + '</p>'
                            + '<p>Written in ' + language + '</p>'
                          + '</li>');
            }
        });
    });

    function formatDate(date) {
        var dateString = date.toDateString();
        var month = dateString.substring(4, 7);
        var day = dateString.substring(8, 10);
        return '<a href="#">' + month + '<b>' + day + '</b></a>';
    }

};

// Sample output for user with one repo:
//
//<ul class="style1">
//    <li class="first">
//        <p class="date"><a href="#">Jan<b>05</b></a></p>
//        <h3>Repo Title</h3>
//        <p><a href="#">Repo description and link.</a></p>
//    </li>
//</ul>
