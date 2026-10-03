/* =========================================================
   KEN — INTERFACE CONTROLLER
========================================================= */


/* =========================================================
   GLOBAL STATE
========================================================= */

const KEN = {

    user: {

        name: "Rohit Makde",

        email: "rohit@example.com"

    },

    commitment: {

        goal: "Play 10 blitz chess matches",

        category: "Chess",

        minimum: 10,

        completed: 4,

        date: "2026-09-30",

        deadline: "23:59",

        verification:
            "Connected activity data",

        stake: 750,

        consequence:
            "Send the ₹750 to the pre-agreed destination."

    },

    accountability: {

        name: "Rahul Makde",

        phone: "+91 98XXXXXX21",

        authorized: true

    },

    state: "IDLE"

};


/* =========================================================
   SCREEN NAVIGATION
========================================================= */

function navigate(pageId) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(page => {

        page.classList.remove("active-page");

    });


    const target =
        document.getElementById(pageId);

    if (!target) {

        console.warn(
            "Page not found:",
            pageId
        );

        return;

    }


    target.classList.add("active-page");

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    console.log(
        "KEN navigation:",
        pageId
    );
}


/* =========================================================
   AUTH
========================================================= */

function showSignup() {

    document
        .getElementById("signinForm")
        .classList.add("hidden");

    document
        .getElementById("signupForm")
        .classList.remove("hidden");

}


function showSignin() {

    document
        .getElementById("signupForm")
        .classList.add("hidden");

    document
        .getElementById("signinForm")
        .classList.remove("hidden");

}


function login() {

    const email =
        document.getElementById("loginEmail").value;

    if (!email) {

        alert("Please enter your email.");

        return;

    }


    openMainApp();

}


function signup() {

    const name =
        document.getElementById("signupName").value;

    const email =
        document.getElementById("signupEmail").value;


    if (!name || !email) {

        alert(
            "Please enter your name and email."
        );

        return;

    }


    KEN.user.name = name;

    KEN.user.email = email;


    openMainApp();

}


function openMainApp() {

    document
        .getElementById("authScreen")
        .classList.add("hidden");

    document
        .getElementById("mainApp")
        .classList.remove("hidden");


    document
        .getElementById("userNameDisplay")
        .textContent =
        KEN.user.name.split(" ")[0];


    KEN.state = "IDLE";


    navigate("homePage");

}


/* =========================================================
   COMMITMENT CREATION
========================================================= */

function reviewCommitment() {

    const goal =
        document
            .getElementById("goalInput")
            .value.trim();

    const category =
        document
            .getElementById("categoryInput")
            .value;

    const minimum =
        document
            .getElementById("minimumInput")
            .value;

    const date =
        document
            .getElementById("dateInput")
            .value;

    const deadline =
        document
            .getElementById("deadlineInput")
            .value;

    const verification =
        document
            .getElementById("verificationInput")
            .value;

    const stake =
        document
            .getElementById("stakeInput")
            .value;

    const consequence =
        document
            .getElementById("consequenceInput")
            .value;


    if (
        !goal ||
        !minimum ||
        !date ||
        !deadline ||
        !stake
    ) {

        alert(
            "Please complete all required commitment fields."
        );

        return;

    }


    KEN.commitment = {

        goal,

        category,

        minimum:
            Number(minimum),

        completed: 0,

        date,

        deadline,

        verification,

        stake:
            Number(stake),

        consequence:
            consequence ||
            "Execute the pre-agreed consequence."

    };


    document
        .getElementById("reviewGoal")
        .textContent =
        goal;


    document
        .getElementById("reviewDate")
        .textContent =
        formatDate(date);


    document
        .getElementById("reviewDeadline")
        .textContent =
        formatTime(deadline);


    document
        .getElementById("reviewStake")
        .textContent =
        `₹${Number(stake).toLocaleString("en-IN")}`;


    document
        .getElementById("reviewVerification")
        .textContent =
        verification;


    document
        .getElementById("reviewConsequence")
        .textContent =
        KEN.commitment.consequence;


    KEN.state =
        "CONTRACT_DRAFTED";


    navigate("reviewPage");

}


/* =========================================================
   DATE HELPERS
========================================================= */

function formatDate(dateString) {

    const date =
        new Date(dateString + "T00:00:00");


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


function formatTime(timeString) {

    const parts =
        timeString.split(":");

    let hour =
        Number(parts[0]);

    const minutes =
        parts[1];

    const suffix =
        hour >= 12
            ? "PM"
            : "AM";

    hour =
        hour % 12 || 12;


    return `${hour}:${minutes} ${suffix}`;

}


/* =========================================================
   CONTRACT AUTHORIZATION
========================================================= */

function authorizeCommitment() {

    const checkbox =
        document.getElementById("contractCheck");


    if (!checkbox.checked) {

        alert(
            "You must explicitly authorize the commitment."
        );

        return;

    }


    KEN.state =
        "CONTACT_AUTHORIZED";


    navigate("authorizationPage");

}


/* =========================================================
   FINAL AUTHORIZATION
========================================================= */

function finishAuthorization() {

    KEN.accountability.authorized =
        true;


    KEN.state =
        "EXECUTION_PLANNED";


    setTimeout(() => {

        KEN.state =
            "READY";


        navigate("todayPage");

    }, 300);

}


/* =========================================================
   GNANI INTERVENTION
========================================================= */

function simulateGnani() {

    KEN.state =
        "INTERVENTION";


    /*
       IMPORTANT FOR REAL ROUND-3 SIMULATION:

       Do NOT fabricate the Gnani response here.

       Instead:

       1. Copy KEN's generated intervention prompt.
       2. Paste it into the Gnani interface/API you actually have.
       3. Play/record the actual returned voice.
       4. Feed the resulting external event back into KEN.

       This button is only a UI simulation placeholder.
    */


    alert(
        "Gnani intervention triggered.\n\n" +
        "For the real Round 3 recording, use your actual Gnani access here and record the real response."
    );

}


/* =========================================================
   ACCOUNTABILITY CALL
========================================================= */

function simulateAccountabilityCall() {

    KEN.state =
        "INTERVENTION";


    navigate("callPage");

}


function finishCall() {

    KEN.state =
        "ACTION_IN_PROGRESS";


    navigate("verificationPage");

}


/* =========================================================
   VERIFICATION
========================================================= */

function verifySuccess() {

    /*
       Demo only.

       In the actual simulation this result must come
       from your real verification evidence / fourth rail.
    */


    KEN.state =
        "VERIFICATION_PENDING";


    setTimeout(() => {

        KEN.state =
            "SUCCESS";


        navigate("successPage");

    }, 500);

}


function verifyFailure() {

    KEN.state =
        "FAILURE_ASSESSMENT";


    setTimeout(() => {

        navigate("failurePage");

    }, 300);

}


/* =========================================================
   ENFORCEMENT
========================================================= */

function simulateEnforcement() {

    /*
       Wizard-of-Oz:

       KEN should output an enforcement request.
       A human behind the curtain supplies the external
       rail response.

       Do NOT claim that money moved unless the external
       simulation actually returned that result.
    */


    KEN.state =
        "ENFORCE";


    alert(
        "ENFORCEMENT REQUEST\n\n" +
        `Amount: ₹${KEN.commitment.stake}\n` +
        "Consequence: " +
        KEN.commitment.consequence
    );


    KEN.state =
        "ADAPT";

}


/* =========================================================
   MENU
========================================================= */

function openMenu() {

    document
        .getElementById("sideMenu")
        .classList.add("open");

    document
        .getElementById("menuOverlay")
        .classList.add("open");

}


function closeMenu() {

    document
        .getElementById("sideMenu")
        .classList.remove("open");

    document
        .getElementById("menuOverlay")
        .classList.remove("open");

}


/* =========================================================
   COUNTDOWN DEMO
========================================================= */

function startCountdown() {

    let seconds =
        3 * 60 * 60 +
        21 * 60 +
        45;


    const element =
        document.getElementById("countdown");


    if (!element) {

        return;

    }


    setInterval(() => {

        if (seconds <= 0) {

            element.textContent =
                "00:00:00";

            return;

        }


        seconds--;


        const hours =
            Math.floor(
                seconds / 3600
            );


        const minutes =
            Math.floor(
                (seconds % 3600) / 60
            );


        const secs =
            seconds % 60;


        element.textContent =

            String(hours)
                .padStart(2, "0")

            + ":" +

            String(minutes)
                .padStart(2, "0")

            + ":" +

            String(secs)
                .padStart(2, "0");


    }, 1000);

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        startCountdown();

        console.log(
            "KEN interface initialized."
        );

        console.log(
            "Current state:",
            KEN.state
        );

    }
);
