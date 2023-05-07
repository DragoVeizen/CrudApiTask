import express, { Request, Response,NextFunction } from 'express';
import { Item, createItem, deleteItem, getItemById, getAllItems, updateItem } from './item';
import { User, createUser, getUserByUsername } from './user';
import { authenticate,AuthRequest,generateToken,comparePassword } from './auth';
const app = express();
app.use(express.json());


app.post('/register', async (req: Request, res: Response) => {
  const user: User = req.body;
  const existingUser = await getUserByUsername(user.username);
  if (existingUser) {
    res.status(409).send('Username already exists');
    return;
  }
  const createdUser = await createUser(user);
  const token = generateToken(createdUser);
  res.json({ user: createdUser, token });
});

app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await getUserByUsername(username);
  if (!user) {
    res.status(401).send('Invalid username or password');
    return;
  }
  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch) {
    res.status(401).send('Invalid username or password');
    return;
  }
  const token = generateToken(user);
  res.json({ user, token });
});

app.post('/logout', async (req: Request, res: Response) => {
  // TODO: Implement logout logic
  res.send('Logout successful');
});

app.get('/items', authenticate, async (req: AuthRequest, res: Response) => {
  const items = await getAllItems();
  res.json(items);
});

app.get('/items/:id', authenticate, async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id);
  const item = await getItemById(id);
  if (!item) {
    res.status(404).send(`Item with ID ${id} not found`);
    return;
  }
  res.json(item);
});

app.post('/items', authenticate, async (req: AuthRequest, res: Response) => {
  const item: Item = req.body;
  const newItem = await createItem(item);
  res.json(newItem);
});

app.put('/items/:id', authenticate, async (req: AuthRequest, res: Response) => {
  const id = parseInt(req.params.id);
  const item: Item = req.body;
  const updatedItem = await updateItem(id, item);
  if (!updatedItem) {
    res.status(404).send(`Item with ID ${id} not found`);
    return;
  }
  res.json(updatedItem);
});

app.delete('/items/:id', authenticate, async (req: AuthRequest, res: Response) => {
  const  id = parseInt(req.params.id);
  const deletedItem = await deleteItem(id);
  if (!deletedItem) {
  res.status(404).send('Item with ID ${id} not found');
  return;
  }
  res.json(deletedItem);
  });

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
  }); 

const port = process.env.PORT || 3000;
app.listen(port, () => {
console.log('Server listening on port ${port}');
});
    

   
    