const FCM = require('fcm-node');
const serverKey = "AAAAR4AYenI:APA91bEBbR3NcJgTV8wEsUytn2bR5PVMUnJu-ryqnMaEKlU9hhLhp64euwTQC3Ux9oxeC63UpeGQTie40mYXAfdHE3WyXJBPekAoT6MarOTSS75G23km5Mxms8NgwWWgYDjzayha8QIT";
const fcm = new FCM(serverKey);
const taskImage = "https://firebasestorage.googleapis.com/v0/b/talkontask-fbc6c.appspot.com/o/pngfuel.com.png?alt=media&token=4c398ec1-8865-4ce8-9ec8-eda79d05d620";

exports.sendAffectedTaskToDev = (fcmToken, title, body, taskId) => {
    var message = {
        to: fcmToken,
        priority: 'high',
        content_available: true,
        notification: { //notification object
            alert: title,
            title: title,
            body: body,
            image: taskImage,
            sound: "default",
            badge: "1",
            vibrate: "true",
            click_action: "FCM_PLUGIN_ACTIVITY", 
            priority: 2
        },
        data: {
            notifType: 'task',
            taskId: taskId
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
