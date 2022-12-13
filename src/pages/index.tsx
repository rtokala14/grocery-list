import { GroceryList } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import {
  Card,
  CardContent,
  CardForm,
  CardHeader,
  List,
  ListItem,
} from "../components";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "Rohit Sir" });

  const [itemName, setItemName] = useState<string>("");
  const { data: list, refetch } = trpc.groceryRouter.findAll.useQuery();
  const insertMutation = trpc.groceryRouter.insertOne.useMutation({
    onSuccess: () => refetch(),
  });
  const deleteAllMutation = trpc.groceryRouter.deleteAll.useMutation({
    onSuccess: () => refetch(),
  });
  const updateOneMutation = trpc.groceryRouter.updateOne.useMutation({
    onSuccess: () => refetch(),
  });

  const insertOne = useCallback(() => {
    if (itemName === "") return;

    insertMutation.mutate({
      title: itemName,
    });

    setItemName("");
  }, [itemName, insertMutation]);

  const clearAll = useCallback(() => {
    if (list?.length) {
      deleteAllMutation.mutate({
        ids: list.map((item) => item.id),
      });
    }
  }, [list, deleteAllMutation]);

  const updateOne = useCallback(
    (item: GroceryList) => {
      updateOneMutation.mutate({
        ...item,
        checked: !item.checked,
      });
    },
    [updateOneMutation]
  );

  return (
    <>
      <Head>
        <title>Grocery List</title>
        <meta
          name="description"
          content="Grocery list tracker by Rohit Tokala"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Card>
        <CardContent>
          <CardHeader
            title="Grocery List"
            listLength={list?.length ?? 0}
            clearAllFn={clearAll}
          />
          <List>
            {list?.map((item) => (
              <ListItem key={item.id} item={item} onUpdate={updateOne} />
            ))}
          </List>
        </CardContent>
        <CardForm
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          submit={insertOne}
        />
      </Card>
    </>
  );
};

export default Home;
