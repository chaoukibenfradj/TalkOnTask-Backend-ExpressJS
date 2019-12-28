const FCM = require('fcm-node');
const serverKey = "AAAAR4AYenI:APA91bEBbR3NcJgTV8wEsUytn2bR5PVMUnJu-ryqnMaEKlU9hhLhp64euwTQC3Ux9oxeC63UpeGQTie40mYXAfdHE3WyXJBPekAoT6MarOTSS75G23km5Mxms8NgwWWgYDjzayha8QIT";
const fcm = new FCM(serverKey);
const taskImage = "https://firebasestorage.googleapis.com/v0/b/talkontask-fbc6c.appspot.com/o/output-onlinepngtools.png?alt=media&token=c3573e50-50c2-41e7-ad3a-a1b7d9d5ef67";

exports.sendAffectedTaskToDev = (fcmToken, title, body, taskId) => {
    var message = {
        to: fcmToken,
        priority: 'high',
        content_available: true,
        notification: { //notification object
            alert: title,
            title: title,
            body: body,
            //image: taskImage,
            icon: taskImage,
            sound: "sound",
            badge: "1",
            vibrate: "true",
            click_action: "FCM_PLUGIN_ACTIVITY",
            priority: "2"
        },
        data: {
            notifType: 'task',
            taskId: taskId
        },
        android: {
            priority: "normal"
        }
    };
    fcm.send(message, function (err, response) {

        if (err) {
            console.log("Erreur In Sending Notification : ", err);
        } else {
            console.log("Notification Sent : ", response);
        }
    })
}

exports.sendAffectedProject = (fcmToken, title, body, projectId) => {
    var message = {
        to: fcmToken,
        priority: 'high',
        content_available: true,
        notification: { //notification object
            alert: title,
            title: title,
            body: body,
            //image: taskImage,
            icon: taskImage,
            sound: "sound",
            badge: "1",
            vibrate: "true",
            click_action: "FCM_PLUGIN_ACTIVITY",
            priority: "2"
        },
        data: {
            notifType: 'project',
            projectId: projectId
        },
        android: {
            priority: "high"
        }
    };
    fcm.send(message, function (err, response) {

        if (err) {
            console.log("Erreur In Sending Notification : ", err);
        } else {
            console.log("Notification Sent : ", response);
        }
    })
}
