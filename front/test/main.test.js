import { test, expect } from '@playwright/test'

test('navigate to main page and add item', async ({page}) => {
    
    await page.goto('http://localhost:3000/')
    await expect(page).toHaveTitle('To Do List App')

    await page.locator('#todolist-input-todo-id').fill("Task 1")
    await page.locator('#todolist-input-description-id').fill("Description for Task 1")

    await page.waitForTimeout(2000); 
    const initCount = await page.getByRole('listitem').count();
    await page.locator('button', {hasText: 'ADD'}).click() 

    await expect(page.getByRole('listitem')).toHaveCount(initCount + 1);
    await expect(page.locator('ul > li > div > span', {hasText: 'Task 1'})).toHaveCount(1);
    await expect(page.locator('ul > li > div > p', {hasText: 'Description for Task 1'})).toHaveCount(1);

    await page.reload()
    await page.waitForTimeout(2000); 
    await expect(page.getByRole('listitem')).toHaveCount(initCount + 1);
})

test('delete an item', async ({page}) => {
    await page.goto('http://localhost:3000/')
    await expect(page).toHaveTitle('To Do List App')
    await page.waitForTimeout(2000);
    const tobeDeleted = page.locator('ul > li', {hasText: 'Task 1'})
    const initCount = await page.getByRole('listitem').count();
    await tobeDeleted.locator('button').click()
    await expect(page.getByRole('listitem')).toHaveCount(initCount - 1)

    await page.reload()
    await page.waitForTimeout(2000);
    await expect(page.getByRole('listitem')).toHaveCount(initCount - 1)
})

test('check an item', async ({page}) => {
    await page.goto('http://localhost:3000/')
    await expect(page).toHaveTitle('To Do List App')

    await page.waitForTimeout(2000);
    const item = page.locator('ul > li', {hasText: 'Task 1'})
    await item.locator('input').check()
    expect(await item.locator('input').isChecked()).toBeTruthy()
    await item.locator('input').uncheck()
    expect(await item.locator('input').isChecked()).toBeFalsy()
})