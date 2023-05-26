import { Alert } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";

export const db = openDatabase({
    name: "rn_sqlite",
});

export default class Crudfunctions {

  static createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(200), description VARCHAR(200), isNotificationSchedule BOOLEAN)`,
        [],
        (sqlTxn, res) => {
          console.log("Table created successfully");
        },
        error => {
          console.log("Error on creating table: " + error.message);
        },
      );
    });
  };
  
    


    static addNotesToDatabase = (data) => {
              // Add data in sqflite 
              db.transaction( async (txn) => {
                  await txn.executeSql(
                       "INSERT INTO items (title , description, isNotificationSchedule) VALUES (?,?,?)",
                       [data[0] ,data[1], data[2]],
                       (sqlTxn, res) => {
                           console.log(`title ${data[0]} and description ${data[1]} and isNotificationSchedule ${data[2]} added successfully`);
                       },
                       error => {
                           console.log("error on adding category " + error.message);
                       },
                   );
               });
               // //////Add data in sqflite 
          }


   // getNotifications Data
    static getNotesData = () => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM items ORDER BY id ASC`,
                [],
                (sqlTxn, res) => {
                    console.log("categories retrieved successfully");
                    let len = res.rows.length;
                    console.log("ROWS", len)
                    if (len > 0) {
                        let results = [];
                        for (let i = 0; i < len; i++) {
                            console.log("Dataa ==> ", res.rows.item(i))
                            let item = res.rows.item(i);
                            results.push({ id: item.id, title: item.name, description:item.description });
    
                        }
                    }
                },
                error => {
                    console.log("error on getting categories " + error.message);
                },
            );
        });
    };
    
    // getNotifications Data      


    // deleteSingleItem 

    static deleteSingleItem = (item, callBack) => {
        Alert.alert(
          "Wait !!!",
          "Are you sure you want to delete",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Ok",
              onPress: () => {
                db.transaction(txn => {
                  txn.executeSql(
                    `DELETE FROM items where id=?`,
                    [item],
                    (sqlTxn, res) => {
                      callBack();
                      console.log(`${item} deleted successfully`);
                    },
                    error => {
                      console.log("error on deleting item: " + error.message);
                    },
                  );
                });
              },
              style: "cancel",
            },
          ],
          {
            cancelable: true,
          }
        );
      }

// deleteSingleItem end


// update function

        static updateInDatabase =(id,title, description, isNotificationSchedule) => {
            db.transaction((tx) => {
                tx.executeSql(
                  'UPDATE items set title=?, description=?, isNotificationSchedule=? where id=?',
                  [title, description, isNotificationSchedule, id],
                  (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                      console.log("Update successfully")
                    //     Alert.alert(
                    //     'Success',
                    //     'User updated successfully',
                    //     [
                    //       {
                    //         text: 'Ok',
                    //         onPress: () => navigation.navigate('HomeScreen'),
                    //       },
                    //     ],
                    //     { cancelable: false }
                    //   );
                    } else alert('Updation Failed');
                  }
                );
              });
        }

// update function end

}