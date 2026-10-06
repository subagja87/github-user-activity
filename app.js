const args = process.argv.slice(2);

const username = args[0];

//Check if username is provided
if (!username) {
    console.log("Please provide a Github username");
    process.exit(1);
}

//Check if username is valid
const regex = /^(?!-)(?!.*--)[A-Za-z0-9-]{1,39}(?<!-)$/;

if (!regex.test(username)) {
    console.log("Invalid Github username format");
    process.exit(1);
}

//Check if username is available
const response = await fetch(
    `https://api.github.com/users/${username}`
)

if (response.status === 404) {
    console.log("Username is not found");
    process.exit(1);
}


const url = `https://api.github.com/users/${username}/events`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
        console.log('No recent activity found for this user in the last 30 days.');
        return;
        }

        const eventDescriptions = {
            CommitCommentEvent: "Commented on a commit",
            CreateEvent: "Created a branch or tag",
            DeleteEvent: "Deleted a branch or tag",
            DiscussionEvent: "Created a discussion",
            ForkEvent: "Forked a repository",
            GollumEvent: "Created or updated a wiki page",
            IssueCommentEvent: "Commented on an issue or pull request",
            IssuesEvent: "Performed an action on an issue",
            MemberEvent: "Added a repository collaborator",
            PublicEvent: "Made a private repository public",
            PullRequestEvent: "Performed an action on a pull request",
            PullRequestReviewEvent: "Reviewed a pull request",
            PullRequestReviewCommentEvent: "Commented on pull request code",
            PushEvent: "Pushed commits to a repository",
            ReleaseEvent: "Published a release",
            WatchEvent: "Starred a repository"
        };

        console.log(`- ${eventDescriptions[data[0].type]} in ${data[0].repo.name}`);
        console.log(`- ${eventDescriptions[data[1].type]} in ${data[1].repo.name}`);
        console.log(`- ${eventDescriptions[data[2].type]} in ${data[2].repo.name}`);
        console.log("- ...");
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })